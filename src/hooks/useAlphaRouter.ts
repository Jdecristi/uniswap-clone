import { parseUnits } from "@ethersproject/units";
import { CurrencyAmount, TradeType } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { BigNumber, ethers } from "ethers";
import JSBI from "jsbi";
import { useMemo } from "react";

import { getToken, getTokenContract, UiToken } from "@src/libs/web3/tokens";

import type { TransactionRequest, Web3Provider } from "@ethersproject/providers";
import type { ChainId } from "@uniswap/sdk-core";
import type { SwapRoute } from "@uniswap/smart-order-router";

const V3_SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

type useAlphaRouterProps = {
  chainId?: ChainId;
  provider?: Web3Provider;
};

const useAlphaRouter = ({ chainId, provider }: useAlphaRouterProps) =>
  useMemo(() => {
    const router = (() => {
      try {
        if (!chainId) throw new Error("No Chain connected");
        if (!provider) throw new Error("Provider is undefined");
        return new AlphaRouter({ chainId, provider });
      } catch (err) {
        console.log(err);
      }
    })();

    const getQuote = (route: SwapRoute) => route.quote.toFixed(6);
    const getRatio = (amount: string, quote: string) => (Number(quote) / Number(amount)).toFixed(3);

    const getExactInputRoute = async (token: UiToken | undefined, quoteToken: UiToken | undefined, amount: string) => {
      try {
        if (!token || !quoteToken) throw new Error("Token is undefined");
        if (!amount) throw new Error("Token amount is undefined");
        if (!router) throw new Error("Router is undefined");

        const inputToken = getToken(token);
        const outputToken = getToken(quoteToken);

        const wei = parseUnits(amount, inputToken.decimals);
        const currencyAmount = CurrencyAmount.fromRawAmount(inputToken, JSBI.BigInt(wei));

        console.log(`Routing EXACT INPUT: ${inputToken.symbol} & ${outputToken.symbol}`);
        const route = await router.route(currencyAmount, outputToken, TradeType.EXACT_INPUT);

        if (route) return route;
      } catch (err) {
        console.log(err);
      }
    };

    const getExactOutputRoute = async (token: UiToken | undefined, quoteToken: UiToken | undefined, amount: string) => {
      try {
        if (!token || !quoteToken) throw new Error("Token is undefined");
        if (!amount) throw new Error("Token amount is undefined");
        if (!router) throw new Error("Router is undefined");

        const inputToken = getToken(token);
        const outputToken = getToken(quoteToken);

        const wei = parseUnits(amount, inputToken.decimals);
        const currencyAmount = CurrencyAmount.fromRawAmount(outputToken, JSBI.BigInt(wei));

        console.log(`Routing EXACT OUTPUT: ${inputToken.symbol} & ${outputToken.symbol}`);
        const route = await router.route(currencyAmount, inputToken, TradeType.EXACT_OUTPUT);

        if (route) return route;
      } catch (err) {
        console.log(err);
      }
    };

    const getRouteTransaction = (route: SwapRoute, walletAddress: string) =>
      ({
        to: V3_SWAP_ROUTER_ADDRESS,
        from: walletAddress,
        gasPrice: BigNumber.from(route.gasPriceWei),
        gasLimit: ethers.utils.hexlify(1000000),
      }) as TransactionRequest;

    const swap = async (transaction: TransactionRequest, inputToken: UiToken) => {
      try {
        if (!provider) throw new Error("Provider is undefined");

        const approvalAmount = parseUnits("10", 18).toString();
        const contract0 = getTokenContract(inputToken, provider!);
        const signer = provider?.getSigner();

        await contract0.connect(signer).approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

        return await signer.sendTransaction(transaction);
      } catch (err) {
        console.log(err);
      }
    };

    return { router, getQuote, getRatio, getExactInputRoute, getExactOutputRoute, getRouteTransaction, swap };
  }, [chainId, provider]);

export { useAlphaRouter };

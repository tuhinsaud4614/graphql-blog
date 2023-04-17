import { ParsedUrlQuery } from "querystring";

import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";

import { deleteCookie } from "cookies-next";

import { setAuthUser } from "@/features";
import { Store, nextReduxWrapper } from "@/store";
import { fetchRefreshToken, getAuthUser } from "@/utils";

export const withSSRAuth = (
  redirectTo: string,
  cb?: (
    store: Store,
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    token?: string,
  ) => Promise<GetServerSidePropsResult<any>>,
) =>
  nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
    const { dispatch } = store;
    const { req, res } = ctx;
    let accessToken: undefined | string;
    try {
      accessToken = await fetchRefreshToken(req);

      if (!accessToken) {
        deleteCookie("jwt", { req, res });
        dispatch(setAuthUser({ user: null, token: null }));
        return {
          redirect: { destination: redirectTo, permanent: false },
          props: {},
        };
      }

      const user = getAuthUser(accessToken);
      dispatch(setAuthUser({ user, token: accessToken }));
    } catch (error) {
      deleteCookie("jwt", { req, res });
      dispatch(setAuthUser({ user: null, token: null }));
      return {
        redirect: { destination: redirectTo, permanent: false },
        props: {},
      };
    }

    if (cb) {
      const result = await cb(store, ctx, accessToken);
      return result;
    }

    return {
      props: {},
    };
  });

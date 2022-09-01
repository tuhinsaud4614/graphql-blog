import { setAuthUser } from "@features";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { nextReduxWrapper, Store } from "store";
import { fetchRefreshToken, getAuthUser } from "utils";

export const withSSRAuth = (
  redirectTo: string,

  cb?: <P extends {} = any>(
    store: Store,
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    token?: string
  ) => Promise<GetServerSidePropsResult<P>>
) =>
  nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
    const { dispatch } = store;
    const { req } = ctx;
    let accessToken: undefined | string;
    try {
      accessToken = await fetchRefreshToken(req);

      if (!accessToken) {
        dispatch(setAuthUser({ user: null, token: null }));
        return {
          redirect: { destination: redirectTo, permanent: false },
          props: {},
        };
      }

      const user = getAuthUser(accessToken);
      dispatch(setAuthUser({ user, token: accessToken }));
    } catch (error) {
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

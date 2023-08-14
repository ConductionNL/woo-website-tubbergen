import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

export const useOpenWoo = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = (filters: IFiltersContext) =>
    useQuery<any, Error>(["OpenWoo", filters], () => API?.OpenWoo.getAll(filters), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  const getOne = (requestId: string) =>
    useQuery<any, Error>(["OpenWoo", requestId], () => API?.OpenWoo.getOne(requestId), {
      initialData: () =>
        queryClient.getQueryData<any[]>("OpenWoo")?.find((_OpenWoo) => _OpenWoo.id === requestId),
      onError: (error) => {
        throw new Error(error.message);
      },
      enabled: !!requestId,
    });

  return { getAll, getOne };
};

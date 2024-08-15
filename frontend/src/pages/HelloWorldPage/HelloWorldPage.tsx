import apiFood from "@/services/apiFood";
import { FC, useEffect, useState } from "react";

export const HelloWorldPage: FC = () => {
  const [response, setResponse] = useState<any>();
  const fetchData = async () => {
    let result;
    try {
      result = await apiFood.get(`/hello-world`);
    } catch (e) {
      console.log(e);
    }

    return result?.data;
  };

  useEffect(() => {
    fetchData().then((data) => setResponse(data));
  }, []);

  return <h1>Server said: {response?.message}</h1>;
};

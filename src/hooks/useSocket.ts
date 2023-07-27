import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

type SocketOptions = {
  autoConnect: boolean;
  onConnect?(): void;
  onDisconnect?(): void;
  onError?(): void;
};

/**
 * @param nsp
 * @param options
 * @returns
 */

export default function useSocket(
  nsp: string,
  options: SocketOptions = {
    autoConnect: true,
  }
): [Socket, boolean, boolean] {
  const [error, setError] = useState<boolean>(false);
  const socket = useRef<Socket>(
    io(process.env.NEXT_PUBLIC_BACKEND_WS + nsp, { autoConnect: false }) // custom autoConnect (useEffect)
  );

  const handleConnect = () => {
    options?.onConnect && options.onConnect();
    setError(false);
  };

  const handleDisconnect = () => {
    options?.onDisconnect && options.onDisconnect();
    setError(false);
  };

  const handleError = () => {
    options?.onError && options.onError();
    setError(true);
  };

  useEffect(() => {
    if (!socket.current.connected) {
      if (options?.autoConnect) {
        socket.current.connect();
      }
      socket.current.on("connect", handleConnect);
      socket.current.on("disconnect", handleDisconnect);
      socket.current.on("connect_error", handleError);
      socket.current.on("connect_failed", handleError);
    }

    return () => {
      if (socket.current.connected) {
        socket.current.disconnect();
        socket.current.off();
        // socket.current.off("connect", handleConnect);
        // socket.current.off("disconnect", handleDisconnect);
        // socket.current.off("connect_error", handleError);
        // socket.current.off("connect_failed", handleError)
      }
    };
  }, []);

  return [socket.current, error];
}

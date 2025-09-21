import { authAtom } from "@app/shared/atoms";
import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { WSMessageData } from "@app/types";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const authData = useAtomValue(authAtom);

  useEffect(() => {
    if (!authData) return;

    const socketInstance = io(import.meta.env.VITE_NOTIFICATION_WS_URL, {
      transports: ["websocket"],
      auth: { token: authData.accessToken },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected:", socketInstance.id);
    });

    socketInstance.on("events", (msg: WSMessageData) => {
      if (msg.type === "background-task") {
        // TODO:
        return;
      }
      if (!msg.message) {
        return;
      }
      setSnackbar({
        open: true,
        message: msg.message || "",
      });
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [authData, setSnackbar]);

  return { socket };
};

export default useSocket;

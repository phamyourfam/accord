import React, { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Socket, SocketOptions } from 'socket.io-client';

export const SocketContext = React.createContext<{
	baseUrl: string;
	createConnection: (url: string, options: any) => { socket: Socket };
}>({});

interface ProviderProps {
	children: React.ReactNode;
	url: string;
	options?: Partial<SocketOptions>;
}

export const SocketProvider = ({
	children,
	options: globalOptions = {},
	url: baseUrl
}: ProviderProps) => {
	function createConnection(url: string, options: Partial<SocketOptions>) {
		const socket = io(baseUrl + url, { ...globalOptions, ...options });
		return { socket };
	}

	return (
		<SocketContext.Provider value={{ baseUrl, createConnection }}>
			{children}
		</SocketContext.Provider>
	);
};

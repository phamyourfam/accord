import { useContext } from 'react';
import { SocketOptions } from 'socket.io-client';

import { SocketContext } from '.';

// export function useSocket(options?: Partial<SocketOptions>);
export function useSocket(
	namespace?: string,
	options?: Partial<SocketOptions>
) {
	const { createConnection } = useContext(SocketContext);

	return createConnection(namespace || '', options);
}

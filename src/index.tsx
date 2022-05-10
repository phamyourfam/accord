import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';

// import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { IoProvider } from 'socket.io-react-hook';
import { Navigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { App, store } from './app';
import { SocketProvider, useSocket } from './features/socket.io';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
	CategoryOverview,
	CategorySettingsOptions
} from './features/categories';
import { ChannelOverview, ChannelSettingsOptions } from './features/channels';
import { ConversationList } from './features/conversations';
import { NotFound } from './app';
import { SpaceOverview } from './features/spaces';
import { Chat, ChatNotFound } from './features/messages';
import { AccountSettings, Me, UserSettingsOptions } from './features/user';
import {
	CreateSpace,
	Discovery,
	SpaceInvites,
	SpaceOptions,
	SpaceSettingsOptions,
	SpaceSidebar
} from './features/spaces';
import { Landing, LoginForm, RequireAuth, SignupForm } from './features/auth';

declare global {
	interface Crypto {
		randomUUID: () => string;
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<ToastContainer />
				<SocketProvider url="http://localhost:8083/socket.io">
					<BrowserRouter>
						<Routes>
							<Route element={<RequireAuth />}>
								<Route
									path="space"
									element={<App main={<Navigate to="discovery" />} />}>
									<Route
										path="discovery"
										element={
											<App sidebar={<SpaceOptions />} main={<Discovery />} />
										}
									/>
									<Route
										path="create"
										element={
											<App
												sidebar={<SpaceOptions />}
												main={<CreateSpace />}
												mainClassName="flex-center bg-[url('./common/assets/img/accord-wallpaper.png')] bg-cover bg-left-bottom bg-eggshell dark:bg-slate"
											/>
										}></Route>
									<Route
										path=":spaceId"
										element={
											<App sidebar={<SpaceSidebar />} main={<ChatNotFound />} />
										}>
										<Route
											path="category/:categoryId"
											element={<App main={<Navigate to="overview" />} />}>
											<Route
												path="overview"
												element={
													<App
														sidebar={<CategorySettingsOptions />}
														main={<CategoryOverview />}
													/>
												}
											/>
											<Route
												path="roles"
												element={
													<App
														sidebar={<CategorySettingsOptions />}
														main={<></>}
													/>
												}
											/>
										</Route>
										<Route
											path="channel/:channelId"
											element={<App main={<Navigate to="overview" />} />}>
											<Route
												path="overview"
												element={
													<App
														sidebar={<ChannelSettingsOptions />}
														main={<ChannelOverview />}
													/>
												}
											/>
											<Route
												path="roles"
												element={
													<App
														sidebar={<ChannelSettingsOptions />}
														main={<></>}
													/>
												}
											/>
										</Route>
										<Route
											path="overview"
											element={
												<App
													sidebar={<SpaceSettingsOptions />}
													main={<SpaceOverview />}
												/>
											}
										/>
										<Route
											path="invites"
											element={
												<App
													sidebar={<SpaceSettingsOptions />}
													main={<SpaceInvites />}
												/>
											}
										/>
										<Route
											path=":channelId"
											element={
												<App
													sidebar={<SpaceSidebar />}
													main={<Chat messageBelongsTo="channel" />}
												/>
											}
										/>
									</Route>
								</Route>
								<Route
									path="me"
									element={
										<App sidebar={<ConversationList />} main={<Me />} />
									}>
									<Route
										path="account"
										element={
											<App
												mainClassName="flex-row"
												sidebar={<UserSettingsOptions />}
												main={<AccountSettings />}
											/>
										}></Route>
								</Route>
							</Route>
							<Route element={<Landing />}>
								<Route path="verify-email" element={<h1>Verify email.</h1>}>
									<Route path=":verificationToken" />
								</Route>
								<Route path="reset-password" element={<h1>Reset password.</h1>}>
									<Route path=":passwordResetToken" />
								</Route>
								<Route path="/" element={<SignupForm />} />
								<Route path="login" element={<LoginForm />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</SocketProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// Change theme based on user preference.
if (
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches
) {
	document.body.classList.remove('dark');
}

document.body.classList.add('dark');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

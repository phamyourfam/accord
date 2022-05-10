import {Inject} from "@tsed/di";
import {BodyParams, Context, Controller, Cookies, Delete, PathParams, Post, Put} from "@tsed/common";

import {GlobalAuth} from "../middleware";
import {AuthService} from "../services";
import {DecodedUserDetails} from "../auth";

@Controller("/auth")
export class AuthController {
  @Inject()
  authService: AuthService;

  @Post("/")
  logIn(@BodyParams("email") email: string, @BodyParams("password") password: string) {
    return this.authService.logIn(email, password);
  }

  @Delete("/")
  @GlobalAuth()
  logOut(
    @Context("user") {id}: DecodedUserDetails,
    @Cookies("access_token") accessToken: string,
    @Cookies("refresh_token") refreshToken: string
  ) {
    return this.authService.logOut(id, accessToken, refreshToken);
  }

  @Post("/logout/:id")
  @GlobalAuth({role: "admin"})
  logOutById(@PathParams("id") id: string) {
    return this.authService.logOut(id);
  }

  @Put("/")
  async renewTokens(@Cookies("refresh_token") refreshToken: string) {
    this.authService.renewTokens(refreshToken);
  }
}

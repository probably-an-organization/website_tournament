"use client";

import axios from "axios";
import type { Metadata } from "next/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Card, Checkbox } from "@futshi/js_toolbox";
import FloatingInput from "~src/components/FloatingInput";
import { useGlobalContext } from "~src/hooks/context/providers/useGlobalContext";
import {
  NotificationType,
  useNotificationContext,
} from "~src/hooks/context/providers/useNotificationContext";
import useAxios from "~src/hooks/useAxios";

type AuthenticationMode = "login" | "register";

type FormValues = {
  email: string;
  password: string;
  passwordVerification?: string;
  rememberMe?: boolean;
};

export const metadata: Metadata = {
  title: "Tournament Generator",
  description: "Tournament Generator",
};

export default function TournamentLoginPage() {
  const [mode, setMode] = useState<AuthenticationMode>("login");

  const { redirect, setUser, user } = useGlobalContext();
  const notification = useNotificationContext();

  const {
    formState,
    getValues,
    handleSubmit,
    register,
    resetField,
    trigger,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordVerification: "",
      rememberMe: false,
    },
  });

  const { post } = useAxios();

  useEffect(() => {
    const checkPassword = async () => {
      if (getValues("password")) {
        await trigger("password");
      }
    };
    checkPassword().catch((err) => console.log(err));
  }, [mode]);

  useEffect(() => {
    if (user.signedIn) {
      redirect("/dashboard", { withLoading: true });
    }
  }, [user.signedIn]);

  const onSubmit = async (credentials: { email: string; password: string }) => {
    try {
      if (mode === "login") {
        const { data, status } = await post<{
          email: string;
          username: string;
          verified: boolean;
        }>("/login", credentials, {
          withCredentials: true,
        });
        setUser((prev) => ({
          ...prev,
          signedIn: true,
          user: data,
        }));
      } else {
        // register
        // alert("TODO, register");
        // await sleep(1000);
        // alert("TODO register success stuff");
      }
    } catch (err) {
      notification({
        title: "Error",
        description: axios.isAxiosError(err)
          ? err.response?.data
          : (err as string),
        type: NotificationType.Error,
      });
    }
  };

  return (
    <main className="h-full w-full">
      {user.signedIn === false && (
        <div className="flex h-full w-full items-center justify-center">
          <Card className="w-full max-w-sm p-3">
            <form
              className="flex flex-col gap-3"
              onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
            >
              <FloatingInput
                error={!!formState.errors.email}
                label="Email"
                onReset={() => resetField("email")}
                value={watch("email")}
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <FloatingInput
                error={!!formState.errors.password}
                label="Password"
                onReset={() => resetField("password")}
                type="password"
                value={watch("password")}
                {...register("password", {
                  required: true,
                  // TODO tooltip @ register (pw min length 8, small char, big char, number, special char)
                  validate: (v) =>
                    mode === "login"
                      ? v.length > 0
                      : v.length >= 8 &&
                        !!v.match(/\W/) &&
                        !!v.match(/[A-Z]/) &&
                        !!v.match(/[a-z]/) &&
                        !!v.match(/\d/),
                })}
              />
              {mode === "register" && (
                <FloatingInput
                  error={!!formState.errors.passwordVerification}
                  label="Verify password"
                  onReset={() => resetField("passwordVerification")}
                  type="password"
                  value={watch("passwordVerification")}
                  {...register("passwordVerification", {
                    required: true,
                    validate: (v) =>
                      v && v.length > 0 && v === getValues("password"),
                  })}
                />
              )}
              {mode === "login" && (
                <div className="flex gap-2">
                  <Checkbox
                    label="Remember me"
                    checked={watch("rememberMe")}
                    {...register("rememberMe", { required: false })}
                  />
                  <label className="text-xs">Remember me</label>
                </div>
              )}
              <Button type="submit">
                {mode === "login" ? "Login" : "Register"}
              </Button>
            </form>
            <div className="mt-3 text-sm">
              <span>
                {`${
                  mode === "login"
                    ? "Not registered yet?"
                    : "Already registered?"
                } `}
              </span>
              <span
                className="cursor-pointer underline"
                onClick={() =>
                  setMode((prev) => (prev === "login" ? "register" : "login"))
                }
              >
                {mode === "login" ? "Register" : "Login"}
              </span>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}

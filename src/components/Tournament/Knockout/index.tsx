"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiClipboard,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";

import Card from "~src/components/Card";
import {
  KnockoutTournamentContextProvider,
  useKnockoutTournamentContext,
} from "~src/hooks/context/useKnockoutTournamentContext";

import KnockoutDetails from "~src/components/Tournament/Knockout/Details";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import Navigation from "~src/components/Tournament/Navigation";
import NavigationPage from "~src/components/Tournament/Navigation/Page";
import { styled } from "~src/utils/stringUtils";
import KnockoutSettings from "./Settings";
import { handleAxiosError } from "~src/utils/axiosUtils";

export default function TournamentKnockout() {
  return (
    <KnockoutTournamentContextProvider>
      <TournamentKnockoutComponent />
    </KnockoutTournamentContextProvider>
  );
}

function TournamentKnockoutComponent() {
  const [navigation, setNavigation] = useState<number>(0);
  const [navigationExpanded, setNavigationExpanded] = useState<boolean>(false);
  const [navigationPin, setNavigationPin] = useState<boolean>(false);

  const { fetchKnockout, knockoutEditPermission, knockoutTournament } =
    useKnockoutTournamentContext();

  const router = useRouter();
  const { redirect, tournament } = useGlobalContext();

  useEffect(() => {
    if (router.query.id) {
      fetchKnockout(Number(router.query.id)).catch((err) =>
        handleAxiosError(err, {
          default: () => redirect("/tournament", { withLoading: true }),
        }),
      );
    }
  }, [router.query.id]);

  return (
    <>
      {knockoutTournament && (
        <>
          {knockoutEditPermission ? (
            <NavigationPage expanded={navigationExpanded} pin={navigationPin}>
              <Navigation
                expanded={navigationExpanded}
                pin={navigationPin}
                setExpanded={setNavigationExpanded}
                setPin={setNavigationPin}
              >
                <ul className="-mx-2 flex flex-col gap-2 overflow-hidden">
                  <li className="float-left flex">
                    <button
                      className="flex-1 px-2"
                      onClick={() => setNavigation(0)}
                    >
                      <div
                        className={styled(
                          "group flex items-center gap-2 rounded transition-colors",
                          navigation === 0
                            ? "bg-neutral-50"
                            : "hover:bg-neutral-600",
                        )}
                      >
                        <FiClipboard
                          className={styled(
                            "w-8 pl-1",
                            navigation === 0
                              ? "stroke-neutral-800"
                              : "stroke-neutral-50",
                          )}
                          size={36}
                        />
                        <span
                          className={styled(
                            "text-sm",
                            navigation === 0 ? "text-neutral-800" : "",
                          )}
                        >
                          Overview
                        </span>
                      </div>
                    </button>
                  </li>
                  <li className="float-left flex">
                    <button
                      className="flex-1 px-2"
                      onClick={() => setNavigation(1)}
                    >
                      <div
                        className={styled(
                          "group flex items-center gap-2 rounded transition-colors",
                          navigation === 1
                            ? "bg-neutral-50"
                            : "hover:bg-neutral-600",
                        )}
                      >
                        <FiSettings
                          className={styled(
                            "w-8 pl-1",
                            navigation === 1
                              ? "stroke-neutral-800"
                              : "stroke-neutral-50",
                          )}
                          size={36}
                        />
                        <span
                          className={styled(
                            "text-sm",
                            navigation === 1 ? "text-neutral-800" : "",
                          )}
                        >
                          Settings
                        </span>
                      </div>
                    </button>
                  </li>
                  <li className="float-left flex">
                    <button
                      className="flex-1 px-2"
                      onClick={() => setNavigation(2)}
                    >
                      <div
                        className={styled(
                          "group flex items-center gap-2 rounded transition-colors",
                          navigation === 2
                            ? "bg-neutral-50"
                            : "hover:bg-neutral-600",
                        )}
                      >
                        <FiMonitor
                          className={styled(
                            "w-8 pl-1",
                            navigation === 2
                              ? "stroke-neutral-800"
                              : "stroke-neutral-50",
                          )}
                          size={36}
                        />
                        <span
                          className={styled(
                            "text-sm",
                            navigation === 2 ? "text-neutral-800" : "",
                          )}
                        >
                          Broadcast
                        </span>
                      </div>
                    </button>
                  </li>
                </ul>
              </Navigation>

              <div className="mx-auto flex w-fit min-w-full flex-col gap-3 p-3">
                <div className="relative flex w-full items-center justify-end">
                  <div className="sticky right-3">
                    <button
                      className="flex items-center gap-1 rounded bg-neutral-500 py-1 pl-1 pr-2 transition-colorsTransform hover:scale-102.5 hover:bg-neutral-400"
                      onClick={() =>
                        redirect(tournament.signedIn ? "/dashboard" : "/", {
                          withLoading: true,
                        })
                      }
                    >
                      {tournament.signedIn ? (
                        <>
                          <FiChevronLeft />
                          <span>Dashboard</span>
                        </>
                      ) : (
                        <>
                          <FiChevronLeft />
                          <span>Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <Card className="w-fit min-w-full p-3">
                  {navigation === 0 && <KnockoutDetails />}
                  {navigation === 1 && <KnockoutSettings />}
                  {navigation === 2 && <div>Todo</div>}
                </Card>
              </div>
            </NavigationPage>
          ) : (
            <Card className="w-fit p-3">
              <KnockoutDetails />
            </Card>
          )}
        </>
      )}
    </>
  );
}

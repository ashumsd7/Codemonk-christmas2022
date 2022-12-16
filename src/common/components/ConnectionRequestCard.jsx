import {
  RhAvatar,
  RhButton,
  RhCard,
  RhCardBody,
  RhChip,
  RhIcon,
  RhToast,
} from "@rhythm-ui/react";
import React from "react";
import {
  useDeleteConnectionMutation,
  useGetCompaniesQuery,
  useGetInvestorQuery,
  useGetMentorQuery,
  usePatchConnectionMutation,
} from "../../services/api";
import { getTokenData } from "../../utils";
import ShowMoreTextUtility from "./utilities/ShowMoreTextUtility";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ConnectionRequestCard({
  pendingMentors,
  pendingInvestors,
  pendingFounders,
}) {
  const userData = getTokenData();
  const [patchConnectionRequest, { isLoading: isAcceptingRequest }] =
    usePatchConnectionMutation();
  const [rejectConnectionRequest, { isLoading: isRejectingRequest }] =
    useDeleteConnectionMutation();

  const pendingMentorsConnectionsIds = pendingMentors.map((data) => data.id);
  const pendingInvestorsConnectionsIds = pendingInvestors.map(
    (data) => data.id
  );
  const pendingFoundersConnectionsIds = pendingFounders.map((data) => data.id);

  const pendingMentorsIds = pendingMentors?.map((mentor) => mentor.sender.id);
  const pendingInvestorsIds = pendingInvestors?.map(
    (investor) => investor.sender.id
  );
  const pendingFoundersIds = pendingFounders?.map(
    (founder) => founder.sender.id
  );

  const {
    data: allMentors,
    isLoading: isLoadingMentors,
    isFetching: isFetchingMentors,
    isError: isMentorsError,
    refetch: reFetchMentors,
  } = useGetMentorQuery({
    user__id__in: pendingMentorsIds?.join(",") || undefined,
  });

  const {
    data: allInvestors,
    isLoading: isLoadingInvestors,
    isFetching: isFetchingInvestors,
    isError: isInvestorsError,
    refetch: reFetchInvestors,
  } = useGetInvestorQuery({
    user__id__in: pendingInvestorsIds?.join(",") || undefined,
  });

  const {
    data: allStartupsData,
    count: allCompaniesCount,
    isLoading: isStartupsLoading,
    isFetching: isStartupApiLoading,
    isError: isStartupFetchError,
    refetch: reFetchStartups,
  } = useGetCompaniesQuery({
    users__in: pendingFoundersIds?.join(",") || undefined,
  });

  // accepted

  const onAcceptRejectAction = (data, type, isAccepting = false, idx) => {
    let receiverId;
    if (type === "startup") {
      receiverId = pendingFoundersIds[idx];
    }
    if (type == "investor" || type === "mentor") {
      receiverId = data.user_detail.id;
    }

    let connectionId = getConnectionId(type, idx);

    const payload = {
      sender: receiverId,
      receiver: userData.user_,
      status: isAccepting ? "Accepted" : "Rejected",
      id: connectionId,
    };

    if (isAccepting) {
      patchConnectionRequest(payload)
        .unwrap()
        .then((res) => {
          RhToast.success("Request Accepted successfully");
        })
        .catch((err) => {
          RhToast.error("Request acceptation failed");
        });
    } else {
      rejectConnectionRequest({ id: payload.id })
        .unwrap()
        .then((res) => {
          RhToast.success("Request Rejected successfully");
        })
        .catch((err) => {
          RhToast.error("Request acceptation failed");
        });
    }
  };

  const getConnectionId = (type, idx) => {
    if (type == "startup") {
      return pendingFoundersConnectionsIds[idx];
    }
    if (type == "investor") {
      return pendingInvestorsConnectionsIds[idx];
    }
    if (type == "mentor") {
      return pendingMentorsConnectionsIds[idx];
    }
  };
  return (
    <>
      <div className="mt-3">
        {pendingFoundersIds?.length > 0 &&
          allStartupsData?.results?.map((data, idx) => {
            return (
              <RhCard className="my-4">
                <RhCardBody className="px-6 py-[30px] ">
                  <div>
                    {/* image */}
                    <div className="flex gap-6 flex-wrap">
                      <RhAvatar
                        size="lg"
                        type={data?.logo ? "image" : "text"}
                        src={data?.logo}
                        name={data?.company_name}
                      ></RhAvatar>

                      <div className="flex flex-col flex-1 gap-2  justify-center">
                        <div>
                          <RhChip className="body-small  font-semibold rounded-lg py-1.5 px-3 ">
                            Startup{" "}
                          </RhChip>
                        </div>
                        <h3>{data?.company_name}</h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data?.description,
                          }}
                          className="body text-secondary-700 mt-2"
                        >
                          {}
                        </p>

                        <div className="flex gap-2  items-center body">
                          <RhIcon icon="ic:outline-watch-later"></RhIcon>
                          <p className="body">
                            {dayjs(pendingFounders[idx]?.modified_ts).fromNow(
                              true
                            )}{" "}
                            ago
                          </p>
                        </div>

                        {/* comment */}
                        {pendingFounders[idx]?.message && (
                          <RhCard className="mt-4 rounded-2xl">
                            <RhCardBody>
                              <p className="flex flex-wrap">
                                {" "}
                                {pendingFounders[idx]?.message}
                              </p>
                            </RhCardBody>
                          </RhCard>
                        )}
                      </div>
                      <div className=" flex gap-4 h-10 ">
                        <RhButton
                          layout="outline"
                          onClick={() => {
                            onAcceptRejectAction(data, "startup", false, idx);
                          }}
                        >
                          Reject
                        </RhButton>
                        <RhButton
                          onClick={() => {
                            onAcceptRejectAction(data, "startup", true, idx);
                          }}
                        >
                          Accept
                        </RhButton>
                      </div>
                    </div>
                  </div>
                </RhCardBody>
              </RhCard>
            );
          })}

        {/* //show all investors */}

        {pendingInvestorsIds?.length > 0 &&
          allInvestors?.results?.map((data, idx) => {
            return (
              <RhCard className="my-4">
                <RhCardBody className="px-6 py-[30px] ">
                  <div>
                    {/* image */}
                    <div className="flex gap-6 flex-wrap">
                      <RhAvatar
                        size="lg"
                        type={data?.user_detail?.image ? "image" : "text"}
                        src={data?.user_detail?.image}
                        name={data?.user_detail.name}
                      ></RhAvatar>
                      {/* detail */}
                      <div className="flex flex-col flex-1 gap-2  justify-center">
                        <div>
                          <RhChip className="body-small  font-semibold rounded-lg py-1.5 px-3 ">
                            Investor{" "}
                          </RhChip>
                        </div>
                        <h3>{data?.user_detail?.name}</h3>
                        <p>
                          <ShowMoreTextUtility
                            text={data?.user_detail?.about}
                            length="30"
                          ></ShowMoreTextUtility>
                        </p>

                        <div className="flex gap-2  items-center body">
                          <RhIcon icon="ic:outline-watch-later"></RhIcon>
                          <p className="body">
                            {dayjs(pendingInvestors[idx]?.modified_ts).fromNow(
                              true
                            )}{" "}
                            ago
                          </p>
                        </div>

                        {/* comment */}
                        {pendingInvestors[idx]?.message && (
                          <RhCard className="mt-4 rounded-2xl">
                            <RhCardBody>
                              <p> {pendingInvestors[idx]?.message}</p>
                            </RhCardBody>
                          </RhCard>
                        )}
                      </div>
                      <div className=" flex gap-4 h-10 ">
                        <RhButton
                          layout="outline"
                          onClick={() => {
                            onAcceptRejectAction(data, "investor", false, idx);
                          }}
                        >
                          Reject
                        </RhButton>
                        <RhButton
                          onClick={() => {
                            onAcceptRejectAction(data, "investor", true, idx);
                          }}
                        >
                          Accept
                        </RhButton>
                      </div>
                    </div>
                  </div>
                </RhCardBody>
              </RhCard>
            );
          })}

        {/* show allMentors */}
        {pendingMentorsIds?.length > 0 &&
          allMentors?.results?.map((data, idx) => {
            return (
              <RhCard className="my-4">
                <RhCardBody className="px-6 py-[30px] ">
                  <div>
                    {/* image */}
                    <div className="flex gap-6 flex-wrap">
                      <RhAvatar
                        size="lg"
                        type={data?.user_detail?.image ? "image" : "text"}
                        src={data?.user_detail?.image}
                        name={data?.user_detail.name}
                      ></RhAvatar>
                      {/* detail */}
                      <div className="flex flex-col flex-1 gap-2  justify-center">
                        <div>
                          <RhChip className="body-small  font-semibold rounded-lg py-1.5 px-3 ">
                            Mentor{" "}
                          </RhChip>
                        </div>
                        <h3>{data?.user_detail?.name}</h3>
                        <p>
                          <ShowMoreTextUtility
                            text={data?.user_detail?.about}
                            length="30"
                          ></ShowMoreTextUtility>
                        </p>

                        <div className="flex gap-2  items-center body">
                          <RhIcon icon="ic:outline-watch-later"></RhIcon>
                          <p className="body">
                            {dayjs(pendingMentors[idx]?.modified_ts).fromNow(
                              true
                            )}{" "}
                            ago
                          </p>
                        </div>

                        {/* comment */}
                        {pendingMentors[idx]?.message && (
                          <RhCard className="mt-4 rounded-2xl">
                            <RhCardBody>
                              <p> {pendingMentors[idx]?.message}</p>
                            </RhCardBody>
                          </RhCard>
                        )}
                      </div>
                      <div className=" flex gap-4 h-10 ">
                        <RhButton
                          layout="outline"
                          onClick={() => {
                            onAcceptRejectAction(data, "mentor", false, idx);
                          }}
                        >
                          Reject
                        </RhButton>
                        <RhButton
                          onClick={() => {
                            onAcceptRejectAction(data, "mentor", true, idx);
                          }}
                        >
                          Accept
                        </RhButton>
                      </div>
                    </div>
                  </div>
                </RhCardBody>
              </RhCard>
            );
          })}
      </div>
    </>
  );
}

export default ConnectionRequestCard;

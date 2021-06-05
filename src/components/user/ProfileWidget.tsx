import { ApolloError, gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

import { ProfileWidgetQuery } from "../../__generated__/ProfileWidgetQuery";
import { notDraggable, skeletonLoaderAttributes, skeletonLoaderBase } from "../../library/mixin/mixin";
import { Card } from "../card/Card";

/* Top */
const ProfileContainer = styled.div`
    display:flex;
`;

const ProfilePicture = styled.div`
    background: ${({ theme }) => theme.palette.primary[700]};
    border-radius: 50%;
    overflow: hidden;
    width: 8rem;
    height: 8rem;
    img {
        width: 8rem;
        height: 8rem;
        ${notDraggable}
    }
`;

const ProfilePictureSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    ${skeletonLoaderBase}
`;

const ProfileNames = styled.div`
    margin: 1rem 0 0 1.5rem;
`;

const ProfileUsername = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;


const ProfileNamesSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    margin: 1rem 0 0 1.5rem;
    width: 8rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    ${skeletonLoaderBase}
`;

const ProfileNamesSkeletonFlexBox = styled.div`
    display: flex;
    flex-direction: column;
`;

/* End Top */

/* Bottom */
const ProfileStats = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: 1.6rem 0rem 0 0rem;
    display: inline-block;
    width: 9.31rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;

const ProfileStatsValue = styled.div`
    display: inline-block;
    padding-right: 0.6rem;
`;

const ProfileStatsType = styled.div`
    display: inline-block;
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

const ProfileStatsSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 9.31rem;
    height: 3rem;
    line-height: 3rem;
    ${skeletonLoaderBase}
`;

const ProfileStatsSkeletonFlexBox = styled.div`
    margin: 1.6rem 0rem 0 0rem;
    display: flex;
    gap: 10px;
`;

const ProfileBio = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

const ProfileBioSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    width: 60%;
    height: 1.6rem;
    margin-top: 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    ${skeletonLoaderBase}
`;
/* End Bottom */

const TextPlaceholder = styled.div<{ w?: string }>`
    height: 1em;
    width: ${({ w }) => w ? w : "10em"};
`;

const PROFILE_WIDGET_QUERY = gql`
    query ProfileWidgetQuery {
        me {
            id
            bio
            avatar
            username
            follower_count
            following_count
        }
    }
`;

export const ProfileWidgetDataContainer: FC = () => {
    const { loading, data, error } = useQuery<ProfileWidgetQuery>(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

    return <ProfileWidget data={data} loading={loading} error={error}></ProfileWidget>;
};

type ProfileWidgetProperties = Readonly<{
    data: ProfileWidgetQuery;
    loading: boolean;
    error: ApolloError;
}>

export const ProfileWidget: FC<ProfileWidgetProperties> = ({ data, loading, error }: ProfileWidgetProperties) => {
    if (loading || error) {
        return (
            <Card padding>
                <ProfileContainer>
                    <ProfilePictureSkeletonLoader />
                    <ProfileNamesSkeletonFlexBox>
                        <ProfileNamesSkeletonLoader />
                        <ProfileNamesSkeletonLoader />
                    </ProfileNamesSkeletonFlexBox>
                </ProfileContainer>
                <ProfileStatsSkeletonFlexBox>
                    <ProfileStatsSkeletonLoader />
                    <ProfileStatsSkeletonLoader />
                </ProfileStatsSkeletonFlexBox>
                <ProfileBioSkeletonLoader />
            </Card>
        );
    }

    const { avatar, username, follower_count, following_count, bio } = data.me;

    return (
        <Card padding>
            <ProfileContainer>
                <ProfilePicture>
                    <img src={avatar} alt="Avatar" />
                </ProfilePicture>

                <ProfileNames>
                    {username}
                    <ProfileUsername>@{username}</ProfileUsername>
                </ProfileNames>
            </ProfileContainer>


            <ProfileStats>
                <ProfileStatsValue>{follower_count}</ProfileStatsValue>
                <ProfileStatsType>followers</ProfileStatsType>
            </ProfileStats>

            <ProfileStats>
                <ProfileStatsValue>{following_count}</ProfileStatsValue>
                <ProfileStatsType>following</ProfileStatsType>
            </ProfileStats>

            <ProfileBio>{bio}</ProfileBio>
        </Card>
    );
};
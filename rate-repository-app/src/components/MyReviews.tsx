import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useNavigate } from "react-router-native";
import { ME } from "../graphql/queries";
import { ReviewItemForUser } from "./SingleRepository";
import {ItemSeparator} from "./RepositoryList";

const MyReviews = (): React.JSX.Element => {
  //const navigate = useNavigate();
  const { data, error, refetch, loading } = useQuery<{ me: any }>(ME, {
    variables: {
      includeReviews: true,
    },
  });
  if (loading)
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  if (error)
    return (
      <>
        <Text>Error fetching data.</Text>
      </>
    );
  const reviews = data ? data.me.reviews.edges.map((n: any) => n.node) : [];
  if (reviews?.length === 0)
    return (
      <>
        <Text>You have no reviews.</Text>
      </>
    );
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item: any) => item.id}
      renderItem={({
        item,
        index,
        separators,
      }: {
        item: any;
        index: any;
        separators: any;
      }) => {
        return (
          <ReviewItemForUser review={item}>
            <View
              style={{
                flexDirection: "row",
                flexShrink: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            ></View>
          </ReviewItemForUser>
        );
      }}
      ListEmptyComponent={() => <Text>No reviews available</Text>}
    />
  );
};

export default MyReviews;

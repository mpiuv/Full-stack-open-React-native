import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Alert, FlatList, Pressable, View, Text } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { ME } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";
import { ReviewItemForUser } from "./SingleRepository";
import { ItemSeparator } from "./RepositoryList";

const MyReviews = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { deleteReview, result } = useDeleteReview();
  if (!deleteReview) {
    console.error("Delete review function is not available.");
    return <></>;
  }
  const { data, error, refetch, loading } = useQuery<{ me: any }>(ME, {
    variables: {
      includeReviews: true,
    },
  });
  useEffect(() => {
    if (result.data?.deleteReview) {
      refetch();
    }
  }, [result]);

  if (loading)
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  if (error)
    return (
      <>
        <Text>Error fetching data. {error.message}</Text>
      </>
    );
  const reviews = data ? data.me.reviews?.edges?.map((n: any) => n?.node) : [];
  if (!reviews || reviews?.length === 0)
    return (
      <>
        <Text>You have no reviews.</Text>
      </>
    );
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item: any) => item?.id}
      renderItem={({
        item,
        index,
        separators,
      }: {
        item: any;
        index: any;
        separators: any;
      }) => {
        if (!item) return null;
        return (
          <View>
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
            <View style={{
                  flexDirection: "row",
                  flexShrink: 1,
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}>
            <Pressable
              onPress={() => item?.repository?.id ? navigate("/" + item?.repository?.id) : undefined}>
              <Text style={{ color: "white", backgroundColor: theme.colors.blue,marginRight:10,padding:10 }}>View repository</Text>
            </Pressable>
            <Pressable
              style={{ backgroundColor: theme.colors.red }}
              onPress={() => {
                if (!item?.id) return;
                Alert.alert("Delete Review", "", [
                  {
                    text: "Cancel",
                    onPress: () => {
                      console.log("no delete");
                    }                  
                  },
                  {
                    text: "Delete",
                    onPress: async () => {
                      try {
                        console.log("delete review" + item?.id);
                        await deleteReview(item?.id);
                      } catch (error) {
                        console.error(
                          "Error deleting review: " + error.message
                        );
                      }
                    },
                  },
                ]);
              }}><Text style={{ color: "white",backgroundColor: theme.colors.red ,padding:10 }}>Delete review</Text>
            </Pressable>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={() => <Text>No reviews available</Text>}
    />
  );
};

export default MyReviews;
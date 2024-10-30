import { FlatList, View, StyleSheet,ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { format } from "date-fns";
import { Card } from "@rneui/themed";
import theme from "../theme";
import { useParams } from "react-router-native";
import React  from "react";

const ratingDimension = 40;
const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    margin: 10,
  },
  listHeader: {
    marginBottom: 20,
  },
  author: {
    marginBottom: 10,
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: ratingDimension / 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    display: "flex",
    height: ratingDimension,
    justifyContent: "center",
    marginEnd: 15,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    width: ratingDimension,
  },
  separator: {
    height: 10,
  },
});

const ARepository = ({
  repository,
}: {
  repository: any;
}): React.JSX.Element => {
  return <RepositoryItem item={repository} github={true} />;
};

/**
 * Renders a single review with rating, author, and text. The author is a username,
 * and the text is the review text.
 *
 * @param {object} props
 * @returns {React.JSX.Element}
 */
export const ReviewItem = ({ review }: { review: any }): React.JSX.Element => {
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.rating}>{review.node.rating}</Text>
        </View>
        <View style={{ flexShrink: 1, flexDirection: "column" }}>
          <View style={styles.author}>
            <Text fontWeight="bold">{review.node.user.username}</Text>
            <Text secondary>
              {format(new Date(review.node.createdAt), "dd.MM.yyyy")}
            </Text>
          </View>
          <Text>{review.node.text}</Text>
        </View>
      </View>
    </Card>
  );
};

export const ReviewItemForUser = ({
  review,
}: {
  review: any;
}): React.JSX.Element => {
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={{ flexShrink: 1, flexDirection: "column" }}>
          <View style={styles.author}>
            <Text fontWeight="bold">{review.repository.fullName}</Text>
            <Text secondary>
              {format(new Date(review.createdAt), "dd.MM.yyyy")}
            </Text>
          </View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </Card>
  );
};
interface Data {
  repository: {
    reviews: {
      edges: Array<{
        node: {
          id: string;
          rating: number;
          user: {
            username: string;
          };
          createdAt: string;
          text: string;
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

const SingleRepository = (): React.JSX.Element => {
  const { id } = useParams<{ id: Readonly<string> }>();
  const { data, error, loading,  fetchMore} = useQuery(GET_REPOSITORY, {
    variables: { id, first: 2 },
    fetchPolicy: 'cache-and-network',
//    pollInterval: 500,
  });
  if (error) {
    console.error(`Error fetching repository data: ${error.message}`);
    return <Text>Error fetching data</Text>;
  }
  if (!data) return <></>;
  return (
    <>
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }: { item: Data['repository']['reviews']['edges'][0] }) => <ReviewItem review={item} />}
      keyExtractor={(item: { node: { id: Data['repository']['reviews']['edges'][0]['node']['id'] } }) => item.node.id}
      ListHeaderComponent={() => <ARepository repository={data.repository} />}
      ListEmptyComponent={() => <Text>No reviews available</Text>}
      onEndReached={() => {
        const canFetchMore =
          !loading && data.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) return;
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            first: 2,
          },  
          updateQuery: (previousResult: Data, { fetchMoreResult }: { fetchMoreResult: Data }): Data => {
            if (!fetchMoreResult) return previousResult;
            return {
              repository: {
                ...previousResult.repository,
                reviews: {
                  ...previousResult.repository.reviews,
                  edges: [
                    ...previousResult.repository.reviews.edges,
                    ...fetchMoreResult.repository.reviews.edges,
                  ],
                  pageInfo: fetchMoreResult.repository.reviews.pageInfo,
                },
              },
            };  
          },

        });
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
    </>
  );
};
export default SingleRepository;

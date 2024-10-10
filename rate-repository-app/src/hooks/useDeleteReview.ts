import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = (): {
  deleteReview: (id: string) => Promise<void>;
  result: any;
} => {
  const [mutate, result] = useMutation<
    { deleteReview: boolean },
    { deleteReviewId: string }
  >(DELETE_REVIEW);

  const deleteReview = async (id: string): Promise<void> => {
    try {
      const { data } = await mutate({ variables: { deleteReviewId: id } });
    } catch (error) {
      console.error(`Error deleting review: ${error.message}`);
    }
  };

  return { deleteReview, result };
};

export default useDeleteReview;

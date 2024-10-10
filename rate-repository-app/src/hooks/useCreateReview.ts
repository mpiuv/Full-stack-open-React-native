import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = (): {
  createReview: (args: {
    readonly ownerName: string;
    readonly repositoryName: string;
    readonly text: string;
    readonly rating: number;
  }) => Promise<{
    readonly createReview: {
      readonly id: string;
      readonly repositoryId: string;
    };
  }>;
  result: {
    loading: boolean;
    data: { createReview: { id: string; repositoryId: string } } | null;
    error: { message: string } | null;
  };
} => {
  const [mutate, result] = useMutation<
    { createReview: { id: string; repositoryId: string } },
    {
      review: {
        ownerName: string;
        repositoryName: string;
        rating: number;
        text: string;
      };
    }
  >(CREATE_REVIEW);

  const createReview = async (createReviewArgs: {
    readonly ownerName: string;
    readonly repositoryName: string;
    readonly text: string;
    readonly rating: number;
  }): Promise<{
    readonly createReview: {
      readonly id: string;
      readonly repositoryId: string;
    };
  }> => {
    if (!createReviewArgs.ownerName) {
      throw new Error("ownerName is required");
    }
    if (!createReviewArgs.repositoryName) {
      throw new Error("repositoryName is required");
    }
    if (!createReviewArgs.text) {
      throw new Error("text is required");
    }
    if (!createReviewArgs.rating) {
      throw new Error("rating is required");
    }
    console.log(createReviewArgs.rating)
    try {
      const res = await mutate({
        variables: {
          review: {
            ownerName: createReviewArgs.ownerName,
            repositoryName: createReviewArgs.repositoryName,
            rating: Number(createReviewArgs.rating),
            text: createReviewArgs.text,
          },
        },
      });

      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res.data;
    } catch (error) {
      throw new Error(`Error creating review: ${(error as any).message}`);
    }
  };
  return {
    createReview,
    result: result as {
      loading: boolean;
      data: { createReview: { id: string; repositoryId: string } } | null;
      error: any;
    },
  };
  
};

export default useCreateReview;

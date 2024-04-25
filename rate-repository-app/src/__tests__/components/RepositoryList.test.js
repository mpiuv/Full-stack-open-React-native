import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        // Add your test code here
        const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
        //debug();
        const [firstRepositoryItem, secondRepositoryItem] = getAllByTestId("repositoryName");
        expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");
        expect(secondRepositoryItem).toHaveTextContent("async-library/react-async");
  
        const [firstRepositoryItem1, secondRepositoryItem1] = getAllByTestId("repositoryDescription");
        expect(firstRepositoryItem1).toHaveTextContent("Build forms in React, without the tears");
        expect(secondRepositoryItem1).toHaveTextContent("Flexible promise-based React data loader");
  
        const [firstRepositoryItem2, secondRepositoryItem2] = getAllByTestId("repositoryLanguage");
        expect(firstRepositoryItem2).toHaveTextContent("TypeScript");
        expect(secondRepositoryItem2).toHaveTextContent("JavaScript");

        const [firstRepositoryItem3, secondRepositoryItem3] = getAllByTestId("stargazersCount");
        expect(firstRepositoryItem3).toHaveTextContent("21.9k");
        expect(secondRepositoryItem3).toHaveTextContent("1.8k");

        const [firstRepositoryItem4, secondRepositoryItem4] = getAllByTestId("forksCount");
        expect(firstRepositoryItem4).toHaveTextContent("1.6k");
        expect(secondRepositoryItem4).toHaveTextContent("69");

        const [firstRepositoryItem5, secondRepositoryItem5] = getAllByTestId("reviewCount");
        expect(firstRepositoryItem5).toHaveTextContent("3");
        expect(secondRepositoryItem5).toHaveTextContent("3");

        const [firstRepositoryItem6, secondRepositoryItem6] = getAllByTestId("ratingAverage");
        expect(firstRepositoryItem6).toHaveTextContent("88");
        expect(secondRepositoryItem6).toHaveTextContent("72");
  
      });
    });
  });
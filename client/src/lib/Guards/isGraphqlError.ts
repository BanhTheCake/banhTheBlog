import { GraphQLError } from '../Types/GraphqlError';

const isGraphQLError = (b: any): b is GraphQLError => {
    return (b as GraphQLError)?.response?.errors !== undefined;
};

export default isGraphQLError;

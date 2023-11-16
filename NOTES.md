While I'm not familiar with TypeScript, I embraced the challenge. Despite the learning curve slowing my progress, it provided a valuable learning experience and encouraged a more methodical approach to problem-solving.

I've adhered to the standard MVC pattern, ensuring that any changes to the data source, such as transitioning to a relational or non-relational database, would only require modifications to the model.

Currently, there's no error handling for the 0th index on getAllCardsData and getCardDataById as the schema consistently conforms to this. However, should the schema change, this would require appropriate handling.

### Happy and sad paths tested for each endpoint.

## getAllCards error handling:

- 500 status and an error message when there is an internal server error.

## getCardById error handling:

- 400 status and error message when an invalid card ID format is provided. This is achieved by using a regex to check the cardId parameter.
- 404 status and an error message when a non-existent cardId is provided.
- 500 status and an error message when there is an internal server error.

I found this challenge thoroughly enjoyable and it has reaffirmed my passion for backend development. I'm eager to be considered for the role and look forward to your response!

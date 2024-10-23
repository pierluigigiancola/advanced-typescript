// Define the template literal key type
type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

// The TemplateLiteralKey type now represents the union:
// 'userId' | 'userName' | 'postId' | 'postName' | 'commentId' | 'commentName'

// Use the Record utility type to create an object type
type MyObjectType = Record<TemplateLiteralKey, string>;

// Now, create an object of type MyObjectType
const myObject: MyObjectType = {
  userId: "user123",
  userName: "Alice",
  postId: "post456",
  postName: "My First Post",
  commentId: "comment789",
  commentName: "Great post!",
};

// Accessing the object properties
console.log(myObject.userId); // Output: 'user123'
console.log(myObject.postName); // Output: 'My First Post'

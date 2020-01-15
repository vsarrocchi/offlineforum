import * as api from "../api";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe("generateID", () => {
  test("generateID should return a string", () => {
    const result = api.generateID();
    expect(typeof result).toBe("string");
  });

  test("generateID should return an unique ID", () => {
    const id1 = api.generateID();
    const id2 = api.generateID();
    expect(id1).not.toBe(id2);
  });
});

test("createPostObject should return an object", () => {
  const testTitle = "Test title";
  const testContent = "Test content";
  const testAuthorName = "Valesca";
  const result = api.createPostObject(testTitle, testContent, testAuthorName);
  expect(typeof result).toBe("object");
  // expect(Object.keys(result).length).toBe(5);
});

describe("fetchAllPosts", () => {
  test("fetchAllPosts should return an array", () => {
    const posts = [{}, {}];
    api.storePostObject(posts);
    // result1 return an array with length 2
    const result1 = api.fetchAllPosts();
    expect(Array.isArray(result1)).toBeTruthy();
    localStorage.clear();
    // result2 return an empty array
    const result2 = api.fetchAllPosts();
    expect(Array.isArray(result2)).toBeTruthy();
  });

  test("fetchAllPosts should get all posts from localStorage", () => {
    const posts = [{}, {}];
    // integration test?
    api.storePostObject(posts);
    expect(api.fetchAllPosts()).toHaveLength(2);
  });
});

test("removePost should remove post from localStorage", () => {
  const posts = [
    {
      title: "First",
      content: "Text 1",
      id: "_11uof3t0o",
      author: "Vale",
      date: "2020-1-11 17:21:44"
    },
    {
      title: "Second",
      content: "Text 2",
      id: "_12uof3t0o",
      author: "Danilo",
      date: "2020-1-12 17:21:44"
    },
    {
      title: "Third",
      content: "Text 3",
      id: "_13uof3t0o",
      author: "Milka",
      date: "2020-1-13 17:21:44"
    }
  ];
  api.storePostObject(posts);
  api.removePost("_12uof3t0o");
  expect(api.fetchAllPosts()).toHaveLength(2);
});

describe("fetchAllComments", () => {
  test("fetchAllComments should return an array", () => {
    const comments = [{}, {}];
    api.storeCommentObject(comments);
    // result1 return an array with length 2
    const result1 = api.fetchAllComments();
    expect(Array.isArray(result1)).toBeTruthy();
    localStorage.clear();
    // result2 return an empty array
    const result2 = api.fetchAllComments();
    expect(Array.isArray(result2)).toBeTruthy();
  });

  test("fetchAllComments should get all comments from localStorage", () => {
    const comments = [{}, {}];
    api.storeCommentObject(comments);
    expect(api.fetchAllComments()).toHaveLength(2);
  });
});

test("createCommentObject should return an object", () => {
  const testComment = "Test comment";
  const testPostId = "_20uof3t0o";
  const testAuthorName = "Enzo";
  const result = api.createCommentObject(
    testComment,
    testPostId,
    testAuthorName
  );
  expect(typeof result).toBe("object");
});

test("filterComments should filter all comments by post id", () => {
  const comments = [
    {
      comment: "Comment text 1",
      id: "_17uof3t0o",
      postId: "_12uof3t0o",
      author: "Danilo",
      date: "2020-1-12 17:21:44"
    },
    {
      comment: "Comment text 2",
      id: "_17uof3t0o",
      postId: "_13uof3t0o",
      author: "Milka",
      date: "2020-1-10 17:21:44"
    },
    {
      comment: "Comment text 3",
      id: "_20uof3t0o",
      postId: "_12uof3t0o",
      author: "Enzo",
      date: "2020-1-17 17:21:44"
    }
  ];
  api.storeCommentObject(comments);
  expect(api.fetchAllComments()).toHaveLength(3);
  expect(api.filterComments(comments, "_12uof3t0o")).toHaveLength(2);
});

test("removeComment should remove comment from localStorage", () => {
  const comments = [
    {
      comment: "Comment text 1",
      id: "_17uof3t0o",
      postId: "_12uof3t0o",
      author: "Danilo",
      date: "2020-1-12 17:21:44"
    },
    {
      comment: "Comment text 2",
      id: "_14uof3t0o",
      postId: "_13uof3t0o",
      author: "Milka",
      date: "2020-1-10 17:21:44"
    },
    {
      comment: "Comment text 3",
      id: "_20uof3t0o",
      postId: "_12uof3t0o",
      author: "Enzo",
      date: "2020-1-17 17:21:44"
    }
  ];
  api.storeCommentObject(comments);
  api.removeComment("_17uof3t0o");
  expect(api.fetchAllComments()).toHaveLength(2);
});

describe("fetchCurrentPersona", () => {
  // Example test
  test("fetchCurrentPersona should get user from localStorage", () => {
    const persona = "Steffe";
    api.storeCurrentPersona(persona);
    expect(api.fetchCurrentPersona()).toMatch(persona);
    localStorage.clear();
    expect(api.fetchCurrentPersona()).toMatch("Zac");
  });

  test("fetchCurrentPersona should return a string", () => {
    const persona = "Steffe";
    api.storeCurrentPersona(persona);
    const result = api.fetchCurrentPersona();
    expect(typeof result).toBe("string");
  });
});

// Error: Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout
test("botReply should return an object", async () => {
  expect.assertions(1);
  const returnData = await api.botReply();
  // console.log(returnData);
  expect(typeof returnData).toBe("object");
});


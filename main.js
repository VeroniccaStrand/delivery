let posts = JSON.parse(localStorage.getItem("posts")) || [];
if (posts.length === 0) {
  fetch("https://dummyjson.com/posts")
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      localStorage.setItem("posts", JSON.stringify(res.posts));
      renderPosts(res.posts);
      posts = res.posts;
    });
} else {
  renderPosts(posts);
}

function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let title = document.createElement("h2");
    let content = document.createElement("p");
    let tagContainer = document.createElement("div");
    let reactContainer = document.createElement("div");
    let tagReact = document.createElement("div");
    let likeBtn = document.createElement("img");
    let react = document.createElement("span");
    let wrap = document.createElement("div");
    
    let cont = document.querySelector(".api-container");

    title.classList.add("title");
    content.classList.add("content");
    tagContainer.classList.add("tag-container");
    reactContainer.classList.add("react-container");
    tagReact.classList.add("tag-react");
    likeBtn.classList.add("like-btn");
    react.classList.add("react");
    wrap.classList.add("wrap");

    likeBtn.src = "/images/heart.png";
    title.innerText = post.title;
    content.innerText = post.body;
    react.innerText = post.reactions;

    reactContainer.append(react, likeBtn);
    tagReact.append(reactContainer);
    wrap.append(title, content, tagReact);
    cont.appendChild(wrap);

    likeBtn.addEventListener("click", () => {
      post.reactions++;
      react.innerText = post.reactions;
      likeBtn.src = "/images/heartFilled.png";
      localStorage.setItem("posts", JSON.stringify(posts));
    });

    for (let j = 0; j < post.tags.length; j++) {
      let render = post.tags[j];
      let tag = document.createElement("span");

      tag.classList.add("tag");

      tag.innerText = render;

      tagContainer.append(tag);
      tagReact.append(tagContainer);
    }
  }
}

//Create new posts 

let postForm = document.getElementById("createModal");
let container = document.querySelector(".post-container");
let contentInput = postForm["content"];
let titleInput = postForm["title"];
let tagsInput2 = postForm["tag2"];
let tagsInput = postForm["tag1"];


let addPost = (title, body, tags) => {
  let post = {
    title,
    body,
    tags,
    reactions: 0,
  };
  posts.unshift(post);

  localStorage.setItem("posts", JSON.stringify(posts));

  location.reload();

  return post;
};

let createPostElement = ({ title, content, tag }) => {
  let postDiv = document.createElement("div");
  let postTitle = document.createElement("h2");
  let postContent = document.createElement("p");
  let likeBtn = document.createElement("img");
  let tags = document.createElement("p");

  tags.classList.add("tag");
  postDiv.classList.add("wrap");
  postTitle.classList.add("title");
  postContent.classList.add("content");

  likeBtn.src = "/images/snowflake-16-32.png";
  postTitle.innerText = title;
  postContent.innerText = content;
  tags.innerText = tag;

  postDiv.append(postTitle, postContent, likeBtn);
  container.appendChild(postDiv);
};

postForm.onsubmit = (e) => {
  let tagArray = [];
  tagArray.push(tagsInput.value, tagsInput2.value);
  e.preventDefault();

  let newPost = addPost(titleInput.value, contentInput.value, tagArray);

  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
  tagsInput2.value = "";
  createPostElement(newPost);
};

// Öppna/ stänga modal
let createPostBtn = document.querySelector(".create-option");
let modal = document.querySelector(".modal-wrap");
let createForm = document.getElementById("createModal");

let submitBtn = document.getElementById("postBtn");
let closeModal = document.querySelector(".close");

function openModal() {
  modal.classList.remove("hidden");
}
createPostBtn.addEventListener("click", openModal);
function close() {
  modal.classList.add("hidden");
}
closeModal.addEventListener("click", close);

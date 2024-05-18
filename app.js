const imageInput = document.querySelector("#imageFileInput");
const memeForm = document.querySelector("#memeForm");
const topText = document.querySelector("#topTextInput");
const bottomText = document.querySelector("#bottomTextInput");
const memesContainer = document.querySelector("#memesContainer");

memeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!imageInput.files[0] || !topText.value || !bottomText.value) {
    alert("All fields are required!");
    return;
  }

  const imageDataUrl = URL.createObjectURL(imageInput.files[0]);
  const image = new Image();
  image.src = imageDataUrl;

  image.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 15;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    ctx.textBaseline = "top";
    ctx.strokeText(topText.value, width / 2, yOffset);
    ctx.fillText(topText.value, width / 2, yOffset);

    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText.value, width / 2, height - yOffset);
    ctx.fillText(bottomText.value, width / 2, height - yOffset);

    const meme = document.createElement("div");
    meme.classList.add("meme");
    meme.appendChild(canvas);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      memesContainer.removeChild(meme);
    });
    meme.appendChild(deleteButton);

    memesContainer.appendChild(meme);

    memeForm.reset();
  });
});

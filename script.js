const videoElement = document.querySelector("#video");
const buttonStart = document.querySelector("#button-start");
const buttonNewTab = document.querySelector("#button-newTab");
let mediaStream = null;
let pictureInPictureWindow = null;

// Prompt to select media stream, pass to video element, then play the video.
async function selectMediaStream() {
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    await videoElement.play();
  } catch (error) {
    // Catch Error Here
    console.log("Error:", error);
  }
}

buttonStart.addEventListener('click', async () => {
  // Disable button when clicked
  buttonStart.disabled = true;
  
  try {
    // Start playing the Picture in Picture
    pictureInPictureWindow = await videoElement.requestPictureInPicture();
  } catch (error) {
    // Handle error if Picture in Picture is not supported or denied
    console.log("Error starting Picture in Picture:", error);
    buttonStart.disabled = true;
  } finally {
    // Reset the button after Picture in Picture started playing or encountered an error
    buttonStart.disabled = false;
  }
});

buttonNewTab.addEventListener('click', async () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  selectMediaStream();
});

// On Load
selectMediaStream();

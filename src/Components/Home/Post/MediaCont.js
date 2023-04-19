import Carousel from "react-bootstrap/Carousel";

export function MediaCont({ vidArr, imgArr }) {
  return (
    <Carousel>
      {imgArr?.length !== 0 &&
        imgArr.map((img) => {
          return (
            <Carousel.Item key={img.id}>
              <div className="postImg_box">
                <img className="post_media" src={img.url} alt="First slide" />
              </div>
            </Carousel.Item>
          );
        })}
      {vidArr?.length !== 0 &&
        vidArr.map((vid) => {
          return (
            <Carousel.Item key={vid.id}>
              <div className="postImg_box">
                <video src={vid.url} className="post_media_vid" controls></video>
              </div>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

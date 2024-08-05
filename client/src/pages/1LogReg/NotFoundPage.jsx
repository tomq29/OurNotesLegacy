function NotFoundPage() {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center row  mx-auto">
        <h1 className="center">404 </h1>

        <h2 className="center">Иди обниму</h2>
        <img
          className="center gif mx-auto mt-5  d-block"
          src="/404.gif"
          alt=""
        />
      </div>
    </>
  );
}

export default NotFoundPage;

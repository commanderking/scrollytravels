type ChapterProps = {
  id: string;
  title: string;
  description: string;
  currentChapterID: string;
};

const ChapterComponent = ({
  id,
  title,
  description,
  currentChapterID,
}: ChapterProps) => {
  const classList = id === currentChapterID ? "step active" : "step";

  return (
    <div id={id} className={classList}>
      <div className="light">
        {title && <h3 className="title text-xl">{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default ChapterComponent;

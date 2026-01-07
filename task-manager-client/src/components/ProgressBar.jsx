export default function ProgressBar({
  worksArray,
  totalWork,
  completedWorks,
  label = "works",
}) {
  let totalCount, completedCount;

  if (Array.isArray(worksArray)) {
    totalCount = worksArray.length;
    completedCount = worksArray.filter((work) => work.isDone).length;
  } else {
    totalCount = totalWork ?? 0;
    completedCount = completedWorks ?? 0;
  }

  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className=" p-2 mx-2">
      <div className="w-full bg-gray-700 h-4 mt-4 rounded-2xl ">
        <div
          className="bg-gray-500 h-4 rounded-2xl"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-white opacity-40">
        {completedCount} / {totalCount} {label} done
      </p>
      <p className="mt-2 text-white opacity-40">{Math.round(progress)}%</p>
    </div>
  );
}

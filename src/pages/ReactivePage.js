import {observable, observer} from "@/which";

const obj = observable({
  count: 1,
});

const ReactivePage = observer(() => {
  return (
    <div>
      <h3>ReactivePage</h3>
      <button
        onClick={() => {
          obj.count++;
          console.log(
            "%c [ obj.count ]-12",
            "font-size:13px; background:pink; color:#bf2c9f;",
            obj.count
          );
        }}>
        {obj.count}
      </button>
    </div>
  );
});
export default ReactivePage;

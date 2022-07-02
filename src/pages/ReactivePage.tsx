import { observable, observe } from "@formily/reactive";
import { observer } from "@formily/reactive-react";

// import { observable } from "../components/my-formily/reactive";
// import { observer } from "../components/my-formily/reactive-react";



// import { observable, observe } from '@formily/reactive'

const obs2 = observable({
  aa: 11
})

const dispose = observe(obs2, change => {
  console.log(change)
})

obs2.aa = 22
console.log('%c [ obs2.aa ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', obs2.aa)


// dispose()


console.log('%c [ obs2.aa ]-201', 'font-size:13px; background:pink; color:#bf2c9f;', obs2.aa)



const obs = observable({
  value: "Hello world",
});

const ReactivePage = observer(() => {

  console.log('%c [ obs ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', obs, obs.value)

  return (
    <div>
      <h3>ReactivePage</h3>
      <input
        style={{
          height: 28,
          padding: "0 8px",
          border: "2px solid #888",
          borderRadius: 3,
        }}
        value={obs.value}
        onChange={(e) => {
          obs.value = e.target.value;
        }}
      />
      <div>{obs.value}</div>
    </div>
  );
});

export default ReactivePage;

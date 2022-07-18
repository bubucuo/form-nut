import {autorun, batch, toJS} from "@/which";

export const validateSelf = (field) => {
  let value = field.value;

  if (typeof value == "string") {
    value = value.trim();
  }

  const query = field.query;

  if (query.required && (value == "" || value == undefined)) {
    field.selfErrors = ["请输入必填项"];
  }
};

export const createReactions = (field) => {
  const reactions = field.props.reactions;
  if (typeof reactions === "function") {
    autorun(
      batch.scope.bound(() => {
        reactions(field);
      })
    );
  }
};

export const batchValidate = async (target) => {
  target.errors = [];
  let i = 0;
  for (const key in target.fields) {
    const field = target.fields[key];

    validateSelf(field);

    if (field.selfErrors[0]) {
      target.errors.push({key, msg: field.selfErrors[0]});
    }
  }

  if (target.errors.length > 0) {
    throw target.errors;
  }
};
export const batchSubmit = async (target, onSubmit) => {
  await batchValidate(target);
  const res = onSubmit(toJS(target.values));
  return res;
};

"use client";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
  usePostTodoMutation,
} from "@/redux/api";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const TodoList = () => {
  const [editId, setEditId] = React.useState(0);
  const { data, isLoading } = useGetTodoQuery();
  const [PostTodoMutation] = usePostTodoMutation();
  const [DeleteTodoMutation] = useDeleteTodoMutation();
  const [EditTodoMutation] = useEditTodoMutation();
  const { register, handleSubmit, setValue, reset } = useForm<Itodo>();
  const onSubmit: SubmitHandler<Itodo> = async (data) => {
    try {
      const newData = {
        _id: editId,
        title: data.title,
        email: data.email,
        age: data.age,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      };
      if (editId) {
        await EditTodoMutation(newData);
      } else {
        const newData = {
          title: data.title,
          email: data.email,
          age: data.age,
          createAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
        };
        await PostTodoMutation(newData);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  const handleDelete = async (_id: number) => {
    try {
      const { data } = await DeleteTodoMutation(_id);
      if (data) {
        alert("item is successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (item: Itodo) => {
    setEditId(item._id!);
    setValue("title", item.title);
    setValue("email", item.email);
    setValue("age", item.age);
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <input type="text" {...register("email")} />
        <input type="number" {...register("age")} />
        <button type="submit">{editId ? "Save" : "Send"}</button>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {data?.map((item) => {
          return (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>{item.email}</p>
              <p> User Age {item.age}</p>
              <p>{item.createAt}</p>
              <button
                onClick={() => handleDelete(item._id!)}
                className=" border py-1 px-3 rounded-sm bg-red-600 text-white"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className=" border py-1 px-3 rounded-sm bg-green-100 ml-2"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;

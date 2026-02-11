import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const getItemById = createAsyncThunk(
  "/item/getItemById",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.get(`/item/${user.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const getAllItems = createAsyncThunk(
  "/item/getAllItems",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/items", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data.reverse());
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createItem = createAsyncThunk(
  "/item/createItem",
  async (user, thunkApi) => {
    try {
      const {
        title,
        description,
        media,
        location,
        country,
        state,
        city,
        type,
        lat,
        lng,
      } = user;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("type", type);
      formData.append("media", media);
      formData.append("lat", lat);
      formData.append("lng", lng);

      const responce = await clientServer.post("/item", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue(responce.data);
      } else {
        return thunkApi.fulfillWithValue(responce.data);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "/item/deleteItem",
  async (user, thunkApi) => {
    try {
      const { id } = user;
      const responce = await clientServer.delete(`/item/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createComment = createAsyncThunk(
  "/item/createComment",
  async (userData, thunkApi) => {
    try {
      const { itemId, comment } = userData;

      const responce = await clientServer.post(
        "/comment",
        {
          itemId: itemId,
          message: comment,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "/item/deleteComment",
  async (userData, thunkApi) => {
    try {
      const { itemId, commentId } = userData;

      const responce = await clientServer.delete(
        "/comment",
        {
          headers: {
            token: localStorage.getItem("token"),
            itemId: itemId,
            commentId: commentId,
          },
        },
      );

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

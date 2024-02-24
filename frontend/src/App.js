import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [response, setResponse] = useState(null);

    const onSubmit = async (inputData) => {
        const res = await axios.post("http://localhost:3002/user", inputData);
        setResponse(res.data);
    };

    return (
        <div className="form-container">
            <h1>React Hook Form</h1>
            <div className="response">
                <h5>レスポンス</h5>
                <p>{response && response.id}</p>
                <p>{response && response.username}</p>
                <p>{response && response.email}</p>
                <p>{response && response.password}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* ユーザー: textbox */}
                <label htmlFor="ユーザー名">ユーザー名</label>
                <input
                    id="username"
                    type="text"
                    {...register("username", {
                        required: "ユーザー名は必須です",
                        maxLength: { value: 20, message: "ユーザー名は20文字以内で入力してください" },
                    })}
                />
                {errors.username && <span>{errors.username.message}</span>}
                {/* メールアドレス: textbox */}
                <label htmlFor="メールアドレス">メールアドレス</label>
                <input
                    id="email"
                    type="text"
                    {...register("email", {
                        required: "メールアドレスは必須です",
                        pattern: { value: /^\S+@\S+$/i, message: "有効なメールアドレスを入力してください" },
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                {/* パスワード: textbox */}
                <label htmlFor="パスワード">パスワード</label>
                <input
                    id="password"
                    type="text"
                    {...register("password", {
                        required: "パスワードは必須です",
                        minLength: { value: 8, message: "パスワードは8文字以上で入力してください" },
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <button type="submit">送信</button>
            </form>
        </div>
    );
}

export default App;

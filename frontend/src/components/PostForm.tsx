import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { createPost } from '../features/posts/postsSlice';

function PostForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameInvalid = submitted && !name.trim();
  const descriptionInvalid = submitted && !description.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name.trim() || !description.trim()) return;

    dispatch(createPost({ name: name.trim(), description: description.trim() }));

    setName('');
    setDescription('');
    setSubmitted(false);
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Nombre del post"
        aria-required="true"
        aria-invalid={nameInvalid}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Descripción del post"
        aria-required="true"
        aria-invalid={descriptionInvalid}
      />
      <button type="submit">Crear</button>
    </form>
  );
}

export default PostForm;

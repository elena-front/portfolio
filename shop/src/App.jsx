import React, { useState } from "react";
import "./App.css";

const products = [
  {
    Name: "Буся",
    Description: "Милый котенок, мальчик",
    Image: "img/cat-1.jpg",
    Price: 10,
  },
  {
    Name: "Муся",
    Description: "Ласковая кошка, девочка",
    Image: "img/cat-2.jpg",
    Price: 100,
  },
  {
    Name: "Гуся",
    Description: "Симпатичный котенок",
    Image: "img/cat-4.jpg",
    Price: 110,
  },
  {
    Name: "Люся",
    Description: "Красивая кошечка",
    Image: "img/cat-5.jpg",
    Price: 101,
  },
  {
    Name: "Маруся",
    Description: "Милый котенок, мальчик",
    Image: "img/cat-6.jpg",
    Price: 11,
  },
  {
    Name: "Куся",
    Description: "Ласковая кошка, девочка",
    Image: "img/cat-7.jpg",
    Price: 100,
  },
  {
    Name: "Мурмуся",
    Description: "Симпатичный котенок",
    Image: "img/cat-8.jpg",
    Price: 110,
  },
  {
    Name: "Джуся",
    Description: "Красивая кошечка",
    Image: "img/cat-9.jpg",
    Price: 101,
  },
];

const FAQ = {
  здравствуйте: "Здравствуйте! Рады приветствовать Вас на нашем сайте!",
  "есть ли в продаже кошечки?":
    "Да, мы пристраиваем ласковых кошечек в добрые руки",
  "подскажите, продаете ли Вы собак?":
    "К сожалению, нет. У нас ожидают хозяев только кошечки",
  "до свидания": "Хорошего дня! Будем рады видеть Вас снова!",
};

function Tile({ name, price, description, image }) {
  return (
    <div className="cat">
      <img src={image} />
      <div className="namePrice">
        <div className="name">{name}</div>
        <div className="price">{price}</div>
      </div>
      <div className="desc">{description}</div>
    </div>
  );
}

function Tiles({ cats = [] }) {
  return (
    <div className="pictures">
      {cats.map((cat, index) => (
        <Tile
          key={index}
          name={cat.name}
          price={`${cat.price} \$`} 
          description={cat.description}
          image={cat.image}
        />
      ))}
    </div>
  );
}

function Navigator({ pageCount, activePage, onChange }) {
  let num = [];
  for (let n = 1; n <= pageCount; n++) {
    num.push(n);
  }

  function handleMoveBack() {
    if (activePage > 1) {
      onChange(activePage - 1);
    }
  }

  function handleMoveForward() {
    if (activePage < pageCount) {
      onChange(activePage + 1);
    }
  }

  return (
    <div className="pagination">
      <NavigatorButton
        content="<"
        onClick={handleMoveBack}
        disabled={activePage === 1}
      />
      {num.map((n) => (
        <NavigatorButton
          key={n}
          content={n}
          active={n === activePage}
          onClick={() => onChange(n)}
        />
      ))}
      <NavigatorButton
        content={">"}
        onClick={handleMoveForward}
        disabled={activePage === pageCount}
      />
    </div>
  );
}

function NavigatorButton({ content, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`pageNumber ${active && "active"}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function Gallery({ cats }) {
  const PAGE_SIZE = 2;

  const [activePage, setActivePage] = useState(1);

  let picNumFirst = (activePage - 1) * PAGE_SIZE;
  let picNumLast = activePage * PAGE_SIZE;

  return (
    <div className="gallery">
      <Tiles cats={cats.slice(picNumFirst, picNumLast)} />
      <Navigator
        pageCount={Math.ceil(cats.length / PAGE_SIZE)}
        activePage={activePage}
        onChange={(newPageNumber) => setActivePage(newPageNumber)}
      />
    </div>
  );
}

function ChatMessage({ text, isReply }) {
  return <div className={"message " + (isReply ? "reply" : "")}>{text}</div>;
}

function Input({ placeholder, onNewMessage }) {
  const [text, setText] = useState("");
  const [isError, setError] = useState(false);
  return (
    <textarea
      className={"newMessage " + (isError ? "error" : "")}
      placeholder={placeholder}
      value={text}
      onChange={(event) => {
        setText(event.target.value);
        if (isError) {
          setError(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();

          if (text) {
            setText("");
            onNewMessage(text);
          } else {
            setError(true);
          }
        }
      }}
    />
  );
}

function Chat({}) {
  const [messages, setMessages] = useState([]);

  function handleNewMessage(text) {
    const answer =
      FAQ[text.toLowerCase().trim()] || "сейчас подойдет человек и ответит";

    setMessages([
      ...messages,
      { content: text, isReply: false },
      { content: answer, isReply: true },
    ]);
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.content} isReply={msg.isReply} />
          ))}
      </div>
      <Input placeholder={"Write a message"} onNewMessage={handleNewMessage} />
    </div>
  );
}

function App() {
  function productToCat(product) {
    return {
      name: product.Name,
      description: product.Description,
      image: product.Image,
      price: product.Price,
    };
  }

  return (
    <>
      <h1>Cuty cats</h1>
      <div className="app">
        <Gallery cats={products.map((p) => productToCat(p))} />
        <Chat />
      </div>
    </>
  );
}

export default App;

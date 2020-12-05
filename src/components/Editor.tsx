import WsArticle from '../webservices/article';
import { UserContext } from '../pages/_app';
import React from 'react';
import Router from 'next/router';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaListOl,
  FaListUl,
  FaLink,
  FaImage,
  FaUndo,
  FaRedo,
  FaSave,
} from 'react-icons/Fa';

declare type ToolBarOptionProps = {
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

declare type ToolBarSectionProps = {
  children: JSX.Element | JSX.Element[];
};

const Editor = () => {
  return (
    <div className='mx-auto bg-gray-900 text-white p-2 rounded-md max-w-6xl'>
      <ToolBar />
      <h1 id='editable-title' className='focus:outline-none p-2 text-white font-bold' contentEditable></h1>
      <p id='editable-body' className='focus:outline-none p-2 min-h-screen' contentEditable></p>
    </div>
  );
};

const ToolBar = (): JSX.Element => {
  const { user, setUser } = React.useContext(UserContext);

  const getHtmlString = () => {
    const title = document.getElementById('editable-title');
    const body = document.getElementById('editable-body');

    if (title.innerHTML.toString().length < 15) return console.log('You mus provide with a descriptive title');

    // console.log(title.innerHTML.toString());
    // console.log(body.innerHTML.toString());

    const wsArticle = new WsArticle();

    console.log(user.bearer);

    wsArticle
      ._post(
        'article/access/create-article',
        {
          title: title.innerHTML.toString(),
          post: body.innerHTML.toString(),
          category: ['Test'],
        },
        { Authorization: `Bearer ${user.bearer}` }
      )
      .then((postDoc) => {
        Router.push(`article?id=${postDoc._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='items-center border-b-2 border-gray-300 border-opacity-50 flex flex-wrap space-x-10'>
      <ToolBarSection>
        <ToolBarOption icon={<FaBold className='text-white' />} onClick={(e) => document.execCommand('bold', false, '')} />
        <ToolBarOption icon={<FaItalic className='text-white' />} onClick={(e) => document.execCommand('italic', false, '')} />
        <ToolBarOption icon={<FaUnderline className='text-white' />} onClick={(e) => document.execCommand('underline', false, '')} />
        <ToolBarOption icon={<FaQuoteRight className='text-white' />} onClick={(e) => document.execCommand('formatBlock', false, '')} />
        <ToolBarOption icon={<FaAlignLeft className='text-white' />} onClick={(e) => document.execCommand('justifyLeft', false, '')} />
        <ToolBarOption icon={<FaAlignCenter className='text-white' />} onClick={(e) => document.execCommand('justifyCenter', false, '')} />
        <ToolBarOption icon={<FaListOl className='text-white' />} onClick={(e) => document.execCommand('insertOrderedList', false, '')} />
        <ToolBarOption icon={<FaListUl className='text-white' />} onClick={(e) => document.execCommand('insertUnorderedList', false, '')} />
      </ToolBarSection>
      <ToolBarSection>
        <ToolBarOption icon={<FaLink className='text-white' />} onClick={(e) => document.execCommand('createLink', false, '')} />

        {/* <input className='hover:bg-gray-700 rounded-md focus:outline-none transition' type='file' name='file' id='uploadFile' onChange={(e) => {}} /> */}

        <ToolBarOption
          icon={<FaImage className='text-white' />}
          onClick={(click) => {
            document.execCommand('insertImage', true, '');
          }}
        />
      </ToolBarSection>
      <ToolBarSection>
        <ToolBarOption icon={<FaUndo className='text-white' />} onClick={(e) => document.execCommand('undo', false, '')} />
        <ToolBarOption icon={<FaRedo className='text-white' />} onClick={(e) => document.execCommand('redo', false, '')} />
      </ToolBarSection>

      <ToolBarSection>
        <ToolBarOption icon={<FaSave className='text-white' />} onClick={(e) => getHtmlString()} />
      </ToolBarSection>
    </div>
  );
};

const ToolBarSection = ({ children }: React.PropsWithChildren<ToolBarSectionProps>): JSX.Element => {
  return <div className='items-center flex flex-wrap space-x-1'>{children}</div>;
};

const ToolBarOption = ({ onClick, icon }: React.PropsWithoutRef<ToolBarOptionProps>): JSX.Element => {
  return (
    <div className='cursor-pointer'>
      <button onClick={onClick} className='hover:bg-gray-700 rounded-md focus:outline-none transition transform active:scale-y-90 active:scale-x-90'>
        <div className='m-2'>{icon}</div>
      </button>
    </div>
  );
};

export default Editor;

// onPaste={(ClipEvent) => {
//   const contentTarget = document.getElementById('editable');

//   let cbPayload = [...(ClipEvent.clipboardData || ClipEvent.originalEvent.clipboardData).items];
//   cbPayload = cbPayload.filter((i) => /image/.test(i.type));

//   if (!cbPayload.length || cbPayload.length === 0) return false;

//   const reader = new FileReader();
//   reader.onload = (ProgresEvent) => {
//     const img = document.createElement('img');
//     const canvas = document.createElement('canvas');
//     let ctx = canvas.getContext('2d');

//     ctx.drawImage(img, 0, 0);

//     const MAX_WIDTH = 10;
//     const MAX_HEIGHT = 10;
//     let width = img.width;
//     let height = img.height;

//     if (width > height) {
//       if (width > MAX_WIDTH) {
//         height *= MAX_WIDTH / width;
//         width = MAX_WIDTH;
//       }
//     } else {
//       if (height > MAX_HEIGHT) {
//         width *= MAX_HEIGHT / height;
//         height = MAX_HEIGHT;
//       }
//     }

//     canvas.width = width;
//     canvas.height = height;

//     ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0, width, height);

//     console.log(ctx);

//     contentTarget.innerHTML.concat(canvas.toDataURL());

//     // contentTarget.innerHTML.concat(`<img src="${ProgresEvent.target.result}">`);
//   };
// }}

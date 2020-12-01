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
  FaHtml5,
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
      <h1 className='focus:outline-none p-2 text-white' contentEditable></h1>
      <div
        id='editable'
        className='focus:outline-none p-2 min-h-screen'
        contentEditable
        onPaste={(ClipEvent) => {
          const contentTarget = document.getElementById('editable');

          let cbPayload = [...(ClipEvent.clipboardData || ClipEvent.originalEvent.clipboardData).items];
          cbPayload = cbPayload.filter((i) => /image/.test(i.type));

          if (!cbPayload.length || cbPayload.length === 0) return false;

          const reader = new FileReader();
          reader.onload = (ProgresEvent) => (contentTarget.innerHTML = `<img src="${ProgresEvent.target.result}">`);
          reader.readAsDataURL(cbPayload[0].getAsFile());
        }}
      ></div>
    </div>
  );
};

const ToolBar = (): JSX.Element => {
  const getHtmlString = () => {
    const oDoc = document.getElementById('editable');

    const oContent = document.createTextNode(oDoc.innerHTML);

    const oPre = document.createElement('pre');

    oPre.id = 'sourceText';

    oPre.appendChild(oContent);

    console.log(oPre.innerHTML.toString());
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
        <ToolBarOption icon={<FaHtml5 className='text-white' />} onClick={(e) => getHtmlString()} />
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
      <button onClick={onClick} className='hover:bg-gray-700 rounded-md focus:outline-none transition'>
        <div className='m-2'>{icon}</div>
      </button>
    </div>
  );
};

export default Editor;

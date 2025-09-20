import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange }) => {
  return (
    <Editor
      onChange={onChange}
      height="100%"
      theme='vs-dark'
      defaultLanguage="html"
      value={code}
    />
  );
};

export default CodeEditor;
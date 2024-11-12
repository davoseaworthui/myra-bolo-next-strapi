import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${
        props.className ? props.className : ''
      }`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

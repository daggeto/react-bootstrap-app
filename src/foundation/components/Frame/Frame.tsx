import React from 'react';

interface Props {
  title: string;
  children: object;
}

export function Frame({title, children}: Props) {
  return <div className='Frame'>{[children]}</div>;
}
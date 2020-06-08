import React from 'react';
import './Frame.scss';

interface Props {
  title: string;
  children: object;
}

export function Frame({title, children}: Props) {
  return <div className="Frame">{[children]}</div>;
}
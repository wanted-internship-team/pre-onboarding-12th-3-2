import React from 'react';
import styled from 'styled-components';

interface IHighlitedKeyword {
  parts: string[];
  value: string;
}

const HighlightedText = ({ parts, value }: IHighlitedKeyword) => {
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && ' '} {/* 이전 파트와의 공백 유지 */}
          {index < parts.length - 1 ? (
            <p style={{ margin: '0', padding: '0' }}>
              {part}
              <Highlighted>{value}</Highlighted>
            </p>
          ) : (
            <Remains>{part}</Remains> // 마지막 파트는 HighlightedText를 사용하지 않음
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const Highlighted = styled.span`
  margin: 0;
  padding: 0 !important;
  display: inline-block;
  font-weight: 700;
`;

const Remains = styled.span`
  margin: 0;
  padding: 0 !important;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default HighlightedText;

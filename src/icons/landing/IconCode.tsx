import React, { SVGProps } from 'react';

/**
 * IconCode component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconCode component
 * @returns {React.ReactElement} The IconCode component
 */
const IconCode: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 70}
      height={props.height || 70}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M59.0625 10.9375H10.9375C9.77718 10.9375 8.66438 11.3984 7.84391 12.2189C7.02344 13.0394 6.5625 14.1522 6.5625 15.3125V54.6875C6.5625 55.8478 7.02344 56.9606 7.84391 57.7811C8.66438 58.6016 9.77718 59.0625 10.9375 59.0625H59.0625C60.2228 59.0625 61.3356 58.6016 62.1561 57.7811C62.9766 56.9606 63.4375 55.8478 63.4375 54.6875V15.3125C63.4375 14.1522 62.9766 13.0394 62.1561 12.2189C61.3356 11.3984 60.2228 10.9375 59.0625 10.9375ZM25.375 39.8125C25.8391 40.1606 26.146 40.6788 26.228 41.2531C26.3101 41.8275 26.1606 42.4109 25.8125 42.875C25.4644 43.3391 24.9462 43.646 24.3719 43.728C23.7975 43.8101 23.2141 43.6606 22.75 43.3125L14 36.75C13.7283 36.5462 13.5078 36.282 13.3559 35.9783C13.2041 35.6745 13.125 35.3396 13.125 35C13.125 34.6604 13.2041 34.3255 13.3559 34.0217C13.5078 33.718 13.7283 33.4538 14 33.25L22.75 26.6875C23.2141 26.3394 23.7975 26.1899 24.3719 26.272C24.9462 26.354 25.4644 26.6609 25.8125 27.125C26.1606 27.5891 26.3101 28.1725 26.228 28.7469C26.146 29.3212 25.8391 29.8394 25.375 30.1875L18.9574 35L25.375 39.8125ZM41.4777 20.2891L32.7277 50.9141C32.6532 51.1952 32.5233 51.4586 32.3457 51.6889C32.1681 51.9192 31.9464 52.1118 31.6935 52.2554C31.4406 52.399 31.1616 52.4907 30.8728 52.5252C30.5841 52.5597 30.2913 52.5363 30.0117 52.4563C29.7321 52.3763 29.4712 52.2413 29.2444 52.0593C29.0176 51.8773 28.8293 51.6519 28.6906 51.3963C28.5519 51.1407 28.4656 50.86 28.4367 50.5706C28.4078 50.2812 28.4369 49.9889 28.5223 49.7109L37.2723 19.0859C37.4404 18.5383 37.8167 18.0786 38.3202 17.8054C38.8237 17.5322 39.4143 17.4675 39.965 17.625C40.5158 17.7826 40.9828 18.1499 41.2656 18.648C41.5485 19.1462 41.6246 19.7354 41.4777 20.2891ZM56 36.75L47.25 43.3125C46.7859 43.6606 46.2025 43.8101 45.6281 43.728C45.0538 43.646 44.5356 43.3391 44.1875 42.875C43.8394 42.4109 43.6899 41.8275 43.772 41.2531C43.854 40.6788 44.1609 40.1606 44.625 39.8125L51.0426 35L44.625 30.1875C44.3952 30.0151 44.2016 29.7992 44.0552 29.552C43.9089 29.3048 43.8126 29.0312 43.772 28.7469C43.7314 28.4625 43.7471 28.1729 43.8184 27.8946C43.8897 27.6163 44.0151 27.3548 44.1875 27.125C44.3599 26.8952 44.5758 26.7016 44.823 26.5552C45.0702 26.4089 45.3438 26.3126 45.6281 26.272C45.9125 26.2314 46.2021 26.2471 46.4804 26.3184C46.7587 26.3897 47.0202 26.5151 47.25 26.6875L56 33.25C56.2717 33.4538 56.4922 33.718 56.6441 34.0217C56.7959 34.3255 56.875 34.6604 56.875 35C56.875 35.3396 56.7959 35.6745 56.6441 35.9783C56.4922 36.282 56.2717 36.5462 56 36.75Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconCode;

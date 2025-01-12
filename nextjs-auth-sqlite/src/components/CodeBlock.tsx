interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}


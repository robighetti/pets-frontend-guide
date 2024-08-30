import {
  ComponentType,
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { Controller } from 'react-hook-form'

import { Container, Content, Error } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  control: any
  icon?: ComponentType<IconBaseProps>
  mask?: (value: string) => string
}

export const Input = ({
  name,
  control,
  label,
  mask,
  icon: Icon,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocused = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Container htmlFor={label}>
          {label}

          <Content id={label} isFocused={isFocused} isFilled={isFilled}>
            {Icon && <Icon size={20} />}
            <input
              {...rest}
              value={value}
              onChange={(e) => {
                const newValue = mask ? mask(e.target.value) : e.target.value
                onChange(newValue)
              }}
              ref={inputRef}
              onFocus={handleInputFocused}
              onBlur={handleInputBlur}
            />
          </Content>
          {error && <Error>{error.message}</Error>}
        </Container>
      )}
    />
  )
}

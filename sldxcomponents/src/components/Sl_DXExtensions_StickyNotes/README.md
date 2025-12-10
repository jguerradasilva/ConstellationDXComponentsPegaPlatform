# Sl_DXExtensions_StickyNotes

Widget de Sticky Notes para Pega Constellation DX Components.

## Descrição

Um componente de notas adesivas (sticky notes) totalmente funcional que permite aos usuários:

- ✅ Criar novas notas
- ✅ Editar texto das notas
- ✅ Excluir notas
- ✅ Escolher cores personalizadas para cada nota
- ✅ Visualizar todas as notas em formato de cards (post-its)
- ✅ Persistir dados automaticamente no Pega Runtime

## Estrutura de Dados

O componente trabalha com uma **Page List** no Pega com a seguinte estrutura:

```
.NotesList (Page List)
  ├─ .NoteText (String)      - Texto da nota
  ├─ .CreatedBy (String)     - Usuário que criou
  ├─ .CreatedOn (DateTime)   - Data/hora de criação
  ├─ .Color (String)         - Cor da nota (hex)
  └─ .pyGUID (String)        - ID único (opcional)
```

## Propriedades do Componente

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `label` | String | "Sticky Notes" | Título do widget |
| `value` | String | ".NotesList" | Caminho da Page List |
| `readOnly` | Boolean | false | Modo somente leitura |

## Cores Disponíveis

- 🟨 Amarelo (`#FFE082`)
- 🟩 Verde (`#A5D6A7`)
- 🟦 Azul (`#90CAF9`)
- 🟪 Rosa (`#F48FB1`)
- 🟪 Roxo (`#CE93D8`)
- 🟧 Laranja (`#FFAB91`)

## Como Usar no Pega

### 1. Build e Deploy

```bash
# Construir o componente
npm run buildAllComponents

# Publicar no servidor Pega
npm run publish
```

### 2. Configurar no Pega

1. **Criar a Page List** na sua classe de trabalho:
   - Nome: `NotesList`
   - Tipo: Page List
   - Adicionar as propriedades: `NoteText`, `CreatedBy`, `CreatedOn`, `Color`

2. **Adicionar o componente na View**:
   - Abra o Constellation Design System
   - Adicione um novo Widget
   - Selecione `Sl_DXExtensions_StickyNotes`
   - Configure a propriedade `value` para `.NotesList`

3. **Deploy**:
   - O componente será disponibilizado automaticamente após o publish
   - Certifique-se de que o canal Constellation está configurado

### 3. Estrutura de Arquivos

```
Sl_DXExtensions_StickyNotes/
├── index.tsx           # Componente principal
├── styles.ts           # Estilos (styled-components)
├── config.json         # Configuração do componente
├── mock.ts             # Dados de exemplo para Storybook
├── demo.stories.tsx    # Stories do Storybook
├── PConnProps.d.ts     # Tipos TypeScript
├── create-nonce.ts     # Utilitário de segurança
└── README.md           # Esta documentação
```

## Integração com Pega Runtime

O componente utiliza os seguintes métodos do Pega Runtime:

- `getPConnect().getActionsApi().updateFieldValue()` - Atualiza o valor da Page List
- `getPConnect().getActionsApi().triggerFieldChange()` - Dispara evento de mudança
- `window.PCore.getUserApi().getOperatorName()` - Obtém o usuário atual

## Desenvolvimento

### Testar no Storybook

```bash
npm run startStorybook
# Acesse: http://localhost:6040
```

### Build de Desenvolvimento

```bash
npm run buildComponent Sl_DXExtensions_StickyNotes
```

### Validar Schema

```bash
npm run validate-schema
```

## Features Técnicas

- ✅ React + TypeScript
- ✅ Styled Components
- ✅ Responsivo (grid adaptativo)
- ✅ Validação ESLint
- ✅ Integração completa com Pega Runtime
- ✅ Suporte a modo Read-Only
- ✅ Keys únicas para renderização otimizada
- ✅ Atualização em tempo real

## Exemplo de Uso em Código

```typescript
// O componente recebe automaticamente as props do Pega
<SlDxExtensionsStickyNotes
  label="Minhas Notas"
  value={pyWorkPage.NotesList}
  readOnly={false}
  getPConnect={getPConnect}
/>
```

## Troubleshooting

### Notas não aparecem

- Verifique se a propriedade `value` está configurada corretamente
- Certifique-se de que a Page List existe na sua classe

### Usuário aparece como "System"

- Verifique se o `PCore.getUserApi()` está disponível
- Em desenvolvimento/Storybook, o nome será mockado

### Componente não aparece na lista

- Execute `npm run publish` novamente
- Limpe o cache do navegador
- Verifique os logs do servidor Pega

## Versão

- **Versão:** 1.0.0
- **Organização:** Sl
- **Biblioteca:** DXExtensions
- **Compatibilidade:** Pega 8.8+

## Suporte

Para questões ou problemas, consulte a documentação oficial do Pega Constellation DX Components.

# Sl_DXExtensions_StickyNotes

Widget de Sticky Notes para Pega Constellation DX Components.

> ⚠️ **REQUISITO OBRIGATÓRIO**: Você deve criar a Page List `.StickyNotes` no Pega **ANTES** de adicionar este widget à sua view.

## Descrição

Um componente de notas adesivas (sticky notes) totalmente funcional que permite aos usuários:

- ✅ Criar novas notas
- ✅ Editar texto das notas
- ✅ Excluir notas
- ✅ Escolher cores personalizadas para cada nota
- ✅ Visualizar todas as notas em formato de cards (post-its)
- ✅ Persistir dados automaticamente no Pega Runtime

## Estrutura de Dados

> ⚠️ **Esta Page List deve ser criada ANTES de usar o widget!**

O componente trabalha com uma **Page List** `.StickyNotes` (tipo `@baseclass`) no Pega:

```
.StickyNotes (Page List - @baseclass)
  ├─ .pyNote (Text)              - Texto da nota
  ├─ .pxCreateOperator (Text)    - Usuário que criou (padrão Pega)
  ├─ .pxCreateDateTime (DateTime)- Data/hora de criação (padrão Pega)
  ├─ .pyDescription (Text)       - Cor da nota (hex)
  └─ .pyGUID (Text)              - ID único (padrão Pega)
```

## Propriedades do Componente

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------||
| `label` | String | "Sticky Notes" | Título do widget |
| `value` | String | ".StickyNotes" | Caminho da Page List (@baseclass) |
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

> ⚠️ **ATENÇÃO**: Execute os passos na ordem abaixo!

**PASSO 1: Criar a Page List (OBRIGATÓRIO PRIMEIRO)**

1. Abra seu Case Type ou Data Type no Pega
2. Vá para a seção **Data model**
3. Clique em **+ Add field**
4. Configure a Page List:
   - **Nome da propriedade**: `StickyNotes`
   - **Tipo**: **Page List**
   - **Page Class**: **@baseclass**
5. Adicione as seguintes propriedades à Page List:
   - `pyNote` (Text) - conteúdo da nota
   - `pxCreateOperator` (Text) - criador (propriedade padrão Pega)
   - `pxCreateDateTime` (DateTime) - timestamp (propriedade padrão Pega)
   - `pyDescription` (Text) - cor em formato hex
   - `pyGUID` (Text) - identificador único
6. **Salve** o data model

**PASSO 2: Adicionar o Widget na View**

1. Abra sua View no App Studio
2. Adicione um novo **Widget** no canvas
3. Selecione `Sl_DXExtensions_StickyNotes`
4. Configure a propriedade `value` para `.StickyNotes` (deve corresponder ao nome da Page List criada no Passo 1)
5. Configure outras propriedades conforme necessário:
   - `label`: "Minhas Notas" (ou título desejado)
   - `readOnly`: `false` (ou `true` para modo somente leitura)
6. **Salve** e teste a view

**PASSO 3: Deploy e Teste**

1. O componente será disponibilizado automaticamente após o publish
2. Certifique-se de que o canal Constellation está configurado
3. Teste criando, editando e excluindo notas

> 💡 **Dica**: Se o widget não exibir corretamente, verifique se a Page List `.StickyNotes` existe no seu data model com todas as propriedades necessárias.

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

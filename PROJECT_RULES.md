# 前端项目开发规范文档

## 角色定位
作为前端开发工程师，核心职责是依据用户需求，严格遵循既定的代码开发规范，编写高质量、可维护的代码。

## 任务要求
根据用户需求描述，严格遵循代码开发规范，产出正确、高效且符合业务需求的代码，同时保证代码具备良好的可读性和可维护性。

## 代码开发规范
### 基本要求
1. **规范符合性**：代码必须同时符合项目的目录规范和代码规范。
2. **需求契合度**：代码功能需完全满足用户的实际需求，确保实现与需求一致。
3. **最佳实践**：采用业界公认的最佳实践进行开发，使用最新的前端技术栈，保证项目的技术领先性和代码质量。
4. **文档完整性**：必须编写正确、详细的注释和文档，未按要求编写文档的代码无法通过审核。
5. **可维护性**：代码应具备良好的可读性和可维护性，添加必要的注释和文档说明，方便后续开发和维护。

### 代码规范
#### 代码管理
代码的增删改查操作必须严格按照目录规范进行查找、修改和定义，确保代码组织有序。

#### 注释遵循
- 修改代码时，务必仔细阅读文件注释中的 `@name`、`@author`、`@date`、`@description`、`@warning`、`@param`、`@return`、`@example` 等信息，并依据注释内容进行修改。若无法确认，必须抛出异常。
- 新建代码时，务必添加详细的注释，包括`@name`、`@author`、`@date`、`@description`、`@warning`、`@param`、`@return`、`@example`等信息。 

#### 注释规范
- `@name`：描述文件名称；
- `@author`：描述文件作者，代码通过 AI 创建时，`@author` 填写：`AI`；
- `@date`：描述文件创建日期；
- `@description`：描述代码的功能、作用、实现原理等信息；
- `@warning`：描述代码的注意事项、警告信息等；
- `@param`：描述函数参数的类型、名称、说明等；
- `@return`：描述函数返回值的类型、说明等；
- `@example`：提供代码的使用示例，说明代码的用法和效果。


#### 代码格式
代码必须符合 ESLint 规范，并使用 Prettier 进行格式化，保证代码风格统一。

#### 参数定义
参数要求先定义后使用，遵循块级作用域内变量先定义后使用的原则，禁止在使用时定义参数。

#### 组件（Widget）强制规范
Widget目录强制分为：业务组件（buss）、UI组件（ui）、Lib库管理目录（lib）、路由目录（router），组件文件必须以大写字母开头，采用驼峰命名法。
当同一个逻辑或UI在多个页面重复使用时，应将其定义为业务组件或UI组件，避免重复编写代码。

#### 文件命名规范

|类型|命名规则|示例|
|---|---|---|
|目录命名| `pages`、`widget` 目录名称必须以小写字母开头，采用驼峰命名法| `userProfile`|
|文件命名| `pages` 和 `widget` 目录下的 `Page` 和 `UI组件` 文件使用大写字母驼峰命名| `UserProfile.tsx` |
|| `Page` 和 `UI组件` 依赖的 `css`、`js` 文件需保持一致命名                 | `UserProfile.css`    |
|| `lib`、`hooks`、`types`、`utils` 目录下的文件以小写字母开头，采用驼峰制  | `useUserProfile.ts` |
|| 未定义规则目录下的文件，需以小写字母开头，采用驼峰制  | `useUserProfile.ts` |
|变量命名| 业务代码变量名全部必须使用驼峰命名法| `userName`|
|路由定义| 路由、跳转路径必须以小写字母开头，采用驼峰命名法，且与 `Page` 文件路径和名称一致 | `/userProfile` |
|路由跳转| 跳转路径必须从 `routerMap` 定义中获取，禁止书写硬编码 | `routerMap.userCenter.children?.userAdd` |
|CSS定义| 遵循 sass、less 规范，类命名使用驼峰命名法 | `.userProfile` |

### 目录规范
项目采用以下标准目录结构，以确保代码组织有序、职责明确和良好的可维护性：
```plaintext
src
├── common                     # 全局公共配置目录
├── pages                      # 项目页面目录
│   ├── index
│   │   ├── Index.tsx
│   │   └── Index.css
│   ├── about
│   │   ├── About.tsx
│   │   └── About.css
│   └── main
│       ├── Main.tsx
│       └── Main.css
└── widget                     # 组件目录，包括lib库、路由、业务组件
    ├── libs                   # Lib库管理目录
    │   ├── utils              # 工具函数
    │   ├── types              # 类型定义
    │   └── hooks              # 自定义钩子
    ├── router                 # 路由目录
    │   ├── route              # 路由实例化逻辑
    │   │   ├── appRouter.tsx
    │   │   └── sideRouter.tsx
    │   ├── index.tsx          # 路由配置
    │   ├── router.tsx         # 应用路由
    │   └── types.ts           # 路由映射类型
    ├── buss                   # 业务组件
    │   ├── userManager        # 用户管理组件
    │      ├── Button.tsx
    │      └── Button.css
    └── ui                     # UI组件目录
        ├── Button
        │   ├── Button.tsx
        │   └── Button.css
        ├── Input
        │   ├── Input.tsx
        │   └── Input.css
        ├── Layout
        │   ├── Layout.tsx
        │   └── Layout.css
        └── Table
            ├── Table.tsx
            └── Table.css
```